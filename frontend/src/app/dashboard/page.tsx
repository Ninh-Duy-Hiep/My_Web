export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trang chủ</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Tổng người dùng</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Doanh thu</h3>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
      </div>
    </div>
  );
}