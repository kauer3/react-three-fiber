const LoadScreen = () => {
  const styles = {
    display: "grid",
    placeItems: "center",
    height: "100vh",
    width: "100vw",
    font: "20px Tahoma, sans-serif",
    color: "white",
    letterSpacing: "3px",
  };

  return (
    <div style={styles}>
      <h1>LOADING...</h1>
    </div>
  );
};

export default LoadScreen;
