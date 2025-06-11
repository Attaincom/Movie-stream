export default function Footer() {
  const handleShare = async () => {
    const shareData = {
      title: 'Taste Labs',
      text: 'Check out this awesome website!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm pt-8 pb-4 border-t border-gray-700 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Explore</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">FAQ</a>
          <a href="#" className="hover:text-white">Press</a>
          <a href="#" className="hover:text-white">Blog</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Jobs</a>
        </div>

        {/* Social Section */}
        <div className="text-center md:text-right">
          <p className="text-white mb-2 font-semibold">Follow us on social media</p>
          <div className="flex justify-center md:justify-end gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <i className="fab fa-linkedin-in" />
            </a>
            <button onClick={handleShare} className="text-white hover:text-green-400">
              <i className="fas fa-share-alt" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 my-4" />

      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="mb-2 md:mb-0">
          © 2023 Taste Labs, Inc. All Rights Reserved.
        </div>
        <div className="flex gap-3">
          <a href="#" className="hover:text-white">Privacy</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
