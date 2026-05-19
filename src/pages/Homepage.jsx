import logoImg from "../assets/logo.png";

function Homepage() {
  return (
    <div className="home-page">
      <a href="/" className="logo">
        <img src={logoImg} alt="Build Forge Logo" />
      </a>

      <p className="buildforgememe home-text">
        BuildForge keeps every car build, part, status, note, and budget in one
        place — because sticky notes and “I’ll remember it later” are how
        wallets die.
      </p>
    </div>
  );
}

export default Homepage;
