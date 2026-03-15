import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Rise', icon: '📈' },
  { path: '/real', label: 'Real', icon: '🌐' },
  { path: '/vox', label: 'Vox', icon: '🎙️' },
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      style={{ backgroundColor: '#1f1f1f', borderTop: '1px solid #333' }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around py-3"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center text-sm cursor-pointer border-none bg-transparent"
            style={{ color: isActive ? '#ff3c3c' : '#bbb', fontWeight: isActive ? 'bold' : 'normal' }}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
