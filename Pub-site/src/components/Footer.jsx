export default function Footer() {
  return (
    <>
      {/* Footer */}
      <div>
        <footer className="footer p-10 bg-gray-800 text-white">
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover text-white">About us</a>
            <a className="link link-hover text-white">Contact</a>
            <a className="link link-hover text-white">Jobs</a>
            <a className="link link-hover text-white">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover text-white">Terms of use</a>
            <a className="link link-hover text-white">Privacy policy</a>
            <a className="link link-hover text-white">Cookie policy</a>
          </div>
          <div>
            <span className="footer-title">Social</span>
            <a className="link link-hover text-white">Twitter</a>
            <a className="link link-hover text-white">Instagram</a>
            <a className="link link-hover text-white">Facebook</a>
          </div>
        </footer>
      </div>
    </>
  );
}
