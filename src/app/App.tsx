const handleLoginSuccess = async () => {
  setIsLoginOpen(false);

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    const { data } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (data?.role && hasAppAccess(data.role)) {
      setCurrentPage('social-hub');
    } else {
      setCurrentPage('index');
    }
  }
};


