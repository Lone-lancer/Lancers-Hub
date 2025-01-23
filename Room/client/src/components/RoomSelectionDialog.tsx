// src/components/RoomSelectionDialog.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import phaserGame from '../PhaserGame';
import Bootstrap from '../scenes/Bootstrap';
import { useAppSelector } from '../hooks';

const Backdrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #33ac96;
  }
`;

const ProgressBar = styled(LinearProgress)`
  width: 360px;
`;

export default function RoomSelectionDialog() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('roomId'); // Extract roomId from URL

    if (!roomId) {
      console.error('No roomId provided in the URL');
      setShowSnackbar(true);
      return;
    }

    console.log(`Extracted roomId from URL: ${roomId}`);

    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
    if (lobbyJoined) {
      bootstrap.network
        .joinOrCreatePublic({ roomId }) // Pass the roomId explicitly
        .then(() => {
          console.log(`Successfully joined or created room with ID: ${roomId}`);
          bootstrap.launchGame(); // Launch the game after joining
        })
        .catch((error) => {
          console.error('Failed to join public lobby:', error);
          setShowSnackbar(true); // Show error message on failure
        });
    }
  }, [lobbyJoined]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="error" variant="outlined">
          Failed to connect to the server. Please try again!
        </Alert>
      </Snackbar>
      <Backdrop>
        <ProgressBarWrapper>
          <h3>Connecting to server...</h3>
          <ProgressBar color="secondary" />
        </ProgressBarWrapper>
      </Backdrop>
    </>
  );
}
