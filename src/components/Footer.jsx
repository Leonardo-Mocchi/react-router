export default function Footer() {
  return (
    <footer className="text-light py-3" style={{ backgroundColor: "#27391C" }}>
      <div className="container text-center">
        <p className="m-0">© {new Date().getFullYear()} LeoLeo's cooking blog&trade;. All rights reserved.</p>
      </div>
    </footer>
  )
}