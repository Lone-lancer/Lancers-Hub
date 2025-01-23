const {
  db,
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  getDoc,
  updateDoc,
} = require("../firebasedb");

const getAllOffices = async (req, res) => {
  try {
    const officesQuery = query(collection(db, "offices"));
    const officesSnapshot = await getDocs(officesQuery);

    const offices = officesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send({
      status: 200,
      message: "Offices retrieved successfully",
      offices,
    });
  } catch (error) {
    console.error("Error retrieving offices:", error);
    res.status(500).send({ message: "Error retrieving offices" });
  }
};

const updateOfficeStatus = async (req, res) => {
  const officeId = req.params.id;
  const { status } = req.body;

  try {
    const officeRef = doc(db, "offices", officeId);
    const officeSnapshot = await getDoc(officeRef);

    if (officeSnapshot.exists()) {
      await setDoc(officeRef, { status: status.toString() }, { merge: true });

      const userRef = doc(db, "users", officeId);

      await updateDoc(userRef, { status: 1 });
      res
        .status(200)
        .json({ message: "Office status updated", officeId, status });
    } else {
      res.status(404).json({ message: "Office not found" });
    }
  } catch (error) {
    console.error("Error updating office status:", error);
    res.status(500).json({ message: "Error updating office status" });
  }
};

const getOfficeStats = async (req, res) => {
  try {
    const officesQuery = query(collection(db, "offices"));
    const officesSnapshot = await getDocs(officesQuery);

    const totalOffices = officesSnapshot.docs.length;
    let pendingCount = 0;
    let acceptedCount = 0;
    let rejectedCount = 0;

    // Count office statuses
    officesSnapshot.docs.forEach((doc) => {
      const officeData = doc.data();
      const status = officeData.status;

      if (status == "0") pendingCount++;
      else if (status == "1") acceptedCount++;
      else if (status == "2") rejectedCount++;
    });

    // Get transactions
    const transactionsQuery = query(collection(db, "transactions"));
    const transactionsSnapshot = await getDocs(transactionsQuery);

    let totalDailyRevenue = 0;
    let totalRevenue = 0;
    const weeklyRevenue = {};

    transactionsSnapshot.docs.forEach((doc) => {
      const transaction = doc.data();

      // Only count successful transactions
      if (transaction.status === "success") {
        const transactionDate = transaction.createdAt.toDate();
        const amount = parseFloat(transaction.amount) || 0;

        // Add to total revenue
        totalRevenue += amount;

        // Daily revenue (today only)
        const today = new Date().toISOString().split("T")[0];
        if (transactionDate.toISOString().split("T")[0] === today) {
          totalDailyRevenue += amount;
        }

        // Weekly revenue
        const weekNumber = getWeekNumber(transactionDate);
        weeklyRevenue[weekNumber] = (weeklyRevenue[weekNumber] || 0) + amount;
      }
    });

    res.status(200).send({
      status: 200,
      totalOffices,
      pendingCount,
      acceptedCount,
      rejectedCount,
      revenue: {
        total: totalRevenue,
        daily: totalDailyRevenue,
        weekly: Object.entries(weeklyRevenue).map(([week, amount]) => ({
          week,
          amount,
        })),
      },
    });
  } catch (error) {
    console.error("Error retrieving office statistics:", error);
    res.status(500).send({ message: "Error retrieving office statistics" });
  }
};

const updateOfficeManager = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      managerName,
      email,
      phone,
      department,
      position,
      startDate,
      officeLocation,
      employmentType,
    } = req.body;

    // Validate required fields
    if (!managerName || !email || !phone) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Update the office document using the correct Firestore syntax
    const officeRef = doc(db, "offices", id);
    await setDoc(
      officeRef,
      {
        managerName,
        managerDetails: {
          email,
          phone,
          department,
          position,
          startDate,
          employmentType,
          updatedAt: new Date(),
        },
      },
      { merge: true }
    );

    res.json({ message: "Manager updated successfully" });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ error: "Failed to update manager" });
  }
};

// Helper function to get week number
const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

module.exports = {
  getAllOffices,
  updateOfficeStatus,
  getOfficeStats,
  updateOfficeManager,
};
