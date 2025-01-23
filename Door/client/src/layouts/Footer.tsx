import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                    <div className="text-gray-600 dark:text-gray-400">
                        <span className="text-sm">
                            © {new Date().getFullYear()}{' '}
                            <a href="#" className="hover:text-primary-500 transition-colors">
                                Adminto
                            </a>
                            . All rights reserved.
                        </span>
                    </div>
                    
                    <nav className="flex items-center space-x-6">
                        <a 
                            href="#" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        >
                            About Us
                        </a>
                        <a 
                            href="#" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        >
                            Help
                        </a>
                        <a 
                            href="#" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        >
                            Contact Us
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
