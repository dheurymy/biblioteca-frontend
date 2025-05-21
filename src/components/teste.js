const HomeUsuario = (props) => {
  const navigate = useNavigate();
  const [navUsu, setNavUsu] = useState("");

  useEffect(() => {
    setNavUsu(localStorage.getItem('navUsu') || "");
  }, []);

  const handleNavChange = (newNavUsu) => {
    localStorage.setItem('navUsu', newNavUsu);
    setNavUsu(newNavUsu);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarOut />

      {navUsu === "acervo" && <ListaLivros />}
      {navUsu === "emprestimos" && <EmprestimosUsuario />}
    </AppTheme>
  );
};

export default HomeUsuario;