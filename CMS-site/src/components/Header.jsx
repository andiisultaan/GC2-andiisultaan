export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <header className="bg-white shadow-bottom p-4 flex justify-between items-center">
        <div className="flex items-center"></div>
        <div className="flex items-center space-x-4">
          <h1>Hi, Hacktiv8!</h1>
          <img className="w-10 h-10 rounded-full" src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/322/original/Logo_Hacktiv8.jpg" alt="Author Name" />
        </div>
      </header>
    </>
  );
}
