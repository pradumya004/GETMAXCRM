const ProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full w-24 h-24 mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Sriram</h2>
          <p className="text-gray-600">admin@example.com</p>
        </div>
      </div>
      <div className="text-gray-800 mb-4">
        <h3 className="text-xl font-semibold">Details</h3>
        <p className="mt-2">Phone: +1234567890</p>
        <p>Address: 123 Main St, City, Country</p>
      </div>
    </div>
  );
};

export default ProfilePage;
