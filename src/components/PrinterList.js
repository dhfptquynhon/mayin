import React, { useState, useEffect } from 'react';
import './PrinterList.css';

// Dữ liệu máy in cục bộ
const printersData = [
  // Đại Học
  { id: 1, name: "CANON MF 244DW", department: "HÀNH CHÁNH", ip: "172.16.0.90", mac: "EC:2E:98:A7:FC:42", type: 'university', status: 'online' },
  { id: 2, name: "CANON MF 244DW", department: "TUYỂN SINH T5", ip: "172.16.0.69", mac: "20:4E:F6:0A:53:75", type: 'university', status: 'online' },
  { id: 3, name: "CANON MF 244DW", department: "TUYỂN SINH T1", ip: "172.16.0.98", mac: "20:4E:F6:5F:9C:2D", type: 'university', status: 'online' },
  { id: 4, name: "CANON MF 244DW", department: "ĐÀO TẠO", ip: "172.16.0.54", mac: "20:4E:F6:0A:35:B7", type: 'university', status: 'online' },
  { id: 5, name: "IN MÀU EPSON L8050", department: "CTSV", ip: "172.16.0.70", mac: "DC:CD:2F:E8:FE:01", type: 'university', status: 'online' },
  { id: 6, name: "CANON MF264DW", department: "VĂN PHÒNG FE", ip: "172.16.0.9", mac: "C4:AE:59:9E:12:2F", type: 'university', status: 'online' },
  { id: 7, name: "HP LaserJet Pro M404DW", department: "CTSV", ip: "172.16.0.154", mac: "C8:5A:CF:D0:B6:51", type: 'university', status: 'online' },
  { id: 8, name: "IN THẺ ENTRUST SIGMA DS2", department: "CTSV", ip: "Dùng cổng USB", mac: "XPS Card Printer", type: 'university', status: 'online' },
  // Phổ Thông
  { id: 9, name: "PHOTO TOSHIBA 357", department: "VĂN PHÒNG FSC", ip: "172.16.0.43", mac: "00:80:91:76:D7:9B", type: 'high_school', status: 'online' },
  { id: 10, name: "CANON MF 244DW", department: "VĂN PHÒNG FSC", ip: "172.16.0.26", mac: "F0:03:8C:95:1D:C4", type: 'high_school', status: 'online' },
  { id: 12, name: "CANON MF 244DW", department: "TUYỂN SINH FSC", ip: "172.16.0.88", mac: "20:4E:F6:0A:35:BD", type: 'high_school', status: 'online' },
];

// SVG Icons thay thế cho react-icons
const SvgIcons = {
  Download: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  ),
  Book: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"/>
    </svg>
  ),
  Wifi: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
    </svg>
  ),
  University: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"/>
    </svg>
  ),
  School: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  ),
  ToggleOn: () => (
    <svg className="icon" viewBox="0 0 24 24" width="20" height="20">
      <path fill="currentColor" d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    </svg>
  ),
  ToggleOff: () => (
    <svg className="icon" viewBox="0 0 24 24" width="20" height="20">
      <path fill="currentColor" d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    </svg>
  ),
  Print: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
    </svg>
  ),
  Search: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  ),
  Filter: () => (
    <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
    </svg>
  )
};

const PrinterList = () => {
  const [groupedPrinters, setGroupedPrinters] = useState({
    "Đại Học": [],
    "Phổ Thông": []
  });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('printerTheme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Driver URLs
  const driverUrls = {
    "CANON MF 244DW": "https://drive.google.com/file/d/1EQUza81I5Tb6dj7gqaHP65YLYXbua0EI/view?usp=sharing",
    "HP LaserJet Pro M404DW": "https://drive.google.com/file/d/1ivYdOH2aLfq_brIyyGs4hIcXwOEx5jsh/view?usp=sharing",
    "IN MÀU EPSON L8050": "https://www.epson.com.vn/Ink-Tank-Printers/L-Series/Epson-L8050/s/SPT_C11CK37501",
    "IN THẺ ENTRUST SIGMA DS2": "https://drive.google.com/file/d/1oev7Yec9TCf7LY7GDE9dD41tL-uB9sGP/view?usp=sharing",
    "CANON MF264DW": "https://drive.google.com/file/d/1bskaNQzomK0you3ShxD8DXKPCAWXzewW/view?usp=sharing",
    "PHOTO TOSHIBA 357": "https://drive.google.com/file/d/1DcAc9P161j_VSA2XUPEtUjoQisODRkr9/view?usp=sharing"
  };

  // Manual URLs
  const manualUrls = {
    "CANON MF 244DW": "https://drive.google.com/drive/folders/10NEl1d0aQklubo1ADqThQn192Y4f5I99?usp=sharing",
    "HP LaserJet Pro M404DW": "https://drive.google.com/file/d/1WeE7sByF2RNz-wKsbqa5ny0uvikEr70D/view?usp=sharing",
    "IN MÀU EPSON L8050": "https://drive.google.com/file/d/1eQKau0M5hCvabr95In9MEfGFgQE54r_-/view?usp=sharing",
    "IN THẺ ENTRUST SIGMA DS2": "https://drive.google.com/file/d/1t8PnGPcGxXyceALP8ZciJqkA0TrSaJXz/view?usp=sharing",
    "CANON MF264DW": "https://www.youtube.com/watch?v=ve9eChF3ako",
    "PHOTO TOSHIBA 357": "https://drive.google.com/drive/folders/1NLUA3sNlDV1zoM0ZfKPpk5ybr1sBlcts?usp=sharing"
  };

  // WiFi connections
  const wifiConnections = {
    "HÀNH CHÁNH": "AP-BT-FU-U6P",
    "TUYỂN SINH T5": "AP-BT-TuyenSinh-U6P",
    "TUYỂN SINH T1": "AP-BT-TuyenSinh-U6P",
    "ĐÀO TẠO": "AP-Tang-4-401-U6",
    "CTSV": "AP-BT-CTSV-U6",
    "VĂN PHÒNG FE": "AP-Tang-5-503-U6",
    "MÁY PHOTO VĂN PHÒNG FSC": "AP-GM-VPFSC-U6P",
    "VĂN PHÒNG FSC": "AP-GM-VPFSC-U6P",
    "GV FSC": "AP-GM-GV-FSC-U6P",
    "TUYỂN SINH FSC": "AP-GM-PDichVu-U6P"
  };

  useEffect(() => {
    localStorage.setItem('printerTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const processedData = printersData.map(printer => ({
      ...printer,
      driverUrl: driverUrls[printer.name] || '#',
      manualUrl: manualUrls[printer.name] || '#',
      wifi: wifiConnections[printer.department] || 'Chưa xác định'
    }));

    const filteredData = processedData.filter(printer => {
      const matchesSearch = 
        printer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        printer.ip.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || printer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    setGroupedPrinters({
      "Đại Học": filteredData.filter(p => p.type === 'university'),
      "Phổ Thông": filteredData.filter(p => p.type === 'high_school')
    });
    
    setTimeout(() => setLoading(false), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  const handleWifiClick = (wifiName, printerName) => {
    if (!wifiName || wifiName === 'Chưa xác định') {
      alert(`Chưa xác định WiFi cho máy in ${printerName}.`);
      return;
    }
    alert(`Máy in: ${printerName}\nWiFi kết nối: ${wifiName}`);
  };

  const handleAction = (printer, type) => {
    if (printer[`${type}Url`] === '#') {
      alert(type === 'driver' ? 'Driver chưa có sẵn để tải về' : 'Hướng dẫn chưa có sẵn');
      return false;
    }
    return true;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#10b981';
      case 'offline': return '#ef4444';
      case 'maintenance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'online': return 'Hoạt động';
      case 'offline': return 'Không hoạt động';
      case 'maintenance': return 'Bảo trì';
      default: return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Đang tải danh sách máy in...</p>
      </div>
    );
  }

  return (
    <div className={`printer-list-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <div className="app-header">
        <div className="header-left">
          <span className="header-icon">
            <SvgIcons.Print />
          </span>
          <h1>Quản lý Máy In</h1>
          <span className="printer-count">
            {printersData.length} máy in
          </span>
        </div>
        
        <div className="header-controls">
          <div className="search-box">
            <span className="search-icon">
              <SvgIcons.Search />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm máy in, phòng ban, IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-box">
            <span className="filter-icon">
              <SvgIcons.Filter />
            </span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="online">Hoạt động</option>
              <option value="offline">Không hoạt động</option>
              <option value="maintenance">Bảo trì</option>
            </select>
          </div>
          
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Chuyển sang sáng" : "Chuyển sang tối"}
          >
            {darkMode ? <SvgIcons.ToggleOff /> : <SvgIcons.ToggleOn />}
            <span>{darkMode ? 'Sáng' : 'Tối'}</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="content-wrapper">
        {Object.entries(groupedPrinters).map(([groupName, printers]) => (
          printers.length > 0 && (
            <div key={groupName} className="printer-group">
              <div className="group-header">
                {groupName === "Đại Học" ? <SvgIcons.University /> : <SvgIcons.School />}
                <h2 className="group-title">{groupName}</h2>
                <span className="group-count">{printers.length} máy in</span>
              </div>
              
              <div className="table-responsive">
                <table className="printer-table">
                  <thead>
                    <tr>
                      <th className="col-status">TRẠNG THÁI</th>
                      <th className="col-name">TÊN THIẾT BỊ</th>
                      <th className="col-dept">PHÒNG/BAN</th>
                      <th className="col-ip">IP</th>
                      <th className="col-mac">MAC</th>
                      <th className="col-wifi">WIFI</th>
                      <th className="col-driver">DRIVER</th>
                      <th className="col-manual">HƯỚNG DẪN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printers.map((printer) => (
                      <tr key={printer.id} className="printer-row">
                        <td className="col-status">
                          <span 
                            className="status-indicator"
                            style={{ backgroundColor: getStatusColor(printer.status) }}
                            title={getStatusText(printer.status)}
                          >
                            {getStatusText(printer.status)}
                          </span>
                        </td>
                        <td className="col-name">
                          <div className="printer-name">
                            <span className="printer-icon">
                              <SvgIcons.Print />
                            </span>
                            {printer.name}
                          </div>
                        </td>
                        <td className="col-dept">
                          <span className="department-badge">{printer.department}</span>
                        </td>
                        <td className="col-ip">
                          <code>{printer.ip}</code>
                        </td>
                        <td className="col-mac">
                          <code>{printer.mac}</code>
                        </td>
                        <td className="col-wifi">
                          <button 
                            className="wifi-btn"
                            onClick={() => handleWifiClick(printer.wifi, printer.name)}
                            title={`WiFi: ${printer.wifi}`}
                          >
                            <SvgIcons.Wifi />
                            <span>{printer.wifi}</span>
                          </button>
                        </td>
                        <td className="col-driver">
                          <a 
                            href={printer.driverUrl} 
                            className="action-btn driver-btn"
                            onClick={(e) => !handleAction(printer, 'driver') && e.preventDefault()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <SvgIcons.Download />
                            <span>Tải Driver</span>
                          </a>
                        </td>
                        <td className="col-manual">
                          <a 
                            href={printer.manualUrl} 
                            className="action-btn manual-btn"
                            onClick={(e) => !handleAction(printer, 'manual') && e.preventDefault()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <SvgIcons.Book />
                            <span>Hướng dẫn</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ))}
        
        {/* Empty state */}
        {Object.values(groupedPrinters).every(group => group.length === 0) && (
          <div className="empty-state">
            <div className="empty-icon">
              <SvgIcons.Print />
            </div>
            <h3>Không tìm thấy máy in nào</h3>
            <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="app-footer">
        <p>© {new Date().getFullYear()} Quản lý Máy In | Tổng số: {printersData.length} máy | Đang hiển thị: {Object.values(groupedPrinters).flat().length} máy</p>
      </div>
    </div>
  );
};

export default PrinterList;