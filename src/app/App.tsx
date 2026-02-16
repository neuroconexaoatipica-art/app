function AppContent() {


  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [pageResolved, setPageResolved] = useState(false);



  
