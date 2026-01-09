import React, { useState, useEffect } from 'react';
import './PrinterList.css'; 
import { 
  FaDownload, 
  FaBook, 
  FaWifi, 
  FaUniversity, 
  FaSchool, 
  FaToggleOn, 
  FaToggleOff,
  FaPrint,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

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
  // Phổ Thông
  { id: 8, name: "PHOTO TOSHIBA 357", department: "VĂN PHÒNG FSC", ip: "172.16.0.43", mac: "00:80:91:76:D7:9B", type: 'high_school', status: 'online' },
  { id: 9, name: "CANON MF 244DW", department: "VĂN PHÒNG FSC", ip: "172.16.0.26", mac: "F0:03:8C:95:1D:C4", type: 'high_school', status: 'online' },
  { id: 10, name: "CANON MF 244DW", department: "TUYỂN SINH FSC", ip: "172.16.0.88", mac: "20:4E:F6:0A:35:BD", type: 'high_school', status: 'online' },
];

const PrinterList = () => {
  const [groupedPrinters, setGroupedPrinters] = useState({
    "Đại Học": [],
    "Phổ Thông": []
  });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Driver URLs cho tất cả máy in
  const driverUrls = {
    "CANON MF 244DW": "https://drive.google.com/file/d/1wDygt1LkR5FepnLLLSDV-zSsdN4ZaWOM/view?usp=sharing",
    "HP LaserJet Pro M404DW": "https://drive.google.com/file/d/1y92MpT2hjGrwqLLMy-1t11jrLR4LYZEr/view?usp=sharing",
    "IN MÀU EPSON L8050": "https://www.epson.com.vn/Ink-Tank-Printers/L-Series/Epson-L8050/s/SPT_C11CK37501",
    "CANON MF264DW": "https://drive.google.com/file/d/1GAAeCK2YA8guTZ0JVNONgylBsXbBI26J/view?usp=sharing",
    "PHOTO TOSHIBA 357": "https://drive.google.com/file/d/1hkJsW-5hMnWTUoosetuKpJwb9xySofyl/view?usp=sharing"
  };

  // Manual URLs cho tất cả máy in
  const manualUrls = {
    "CANON MF 244DW": "https://drive.google.com/drive/folders/1caE1WmnqpCRju02fnTc9kRlwRmDYJpg7?usp=drive_link",
    "HP LaserJet Pro M404DW": "https://drive.google.com/file/d/101HzBNAc6aIopsOlHTsMZImcfOFpjLE3/view?usp=sharing",
    "IN MÀU EPSON L8050": "https://drive.google.com/file/d/1GbNPm2nbd86W3DtSD7bGcXbCmwC9fdRp/view",
    "CANON MF264DW": "https://www.youtube.com/watch?v=ve9eChF3ako",
    "PHOTO TOSHIBA 357": "https://drive.google.com/drive/folders/1caE1WmnqpCRju02fnTc9kRlwRmDYJpg7?usp=drive_link"
  };

  // WiFi connections cho tất cả phòng ban
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
    // Xử lý dữ liệu cục bộ thay vì fetch
    const processedData = printersData.map(printer => ({
      ...printer,
      driverUrl: driverUrls[printer.name] || '#',
      manualUrl: manualUrls[printer.name] || '#',
      wifi: wifiConnections[printer.department] || 'Chưa xác định'
    }));

    // Lọc dữ liệu theo search và status
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
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  const handleWifiClick = (wifiName, printerName) => {
    if (!wifiName || wifiName === 'Chưa xác định') {
      alert(`Chưa xác định WiFi cho máy in ${printerName}.`);
      return;
    }
    // Hiển thị thông tin WiFi
    alert(`Máy in: ${printerName}\nWiFi kết nối: ${wifiName}`);
  };

  const handleAction = (printer, type) => {
    if (printer[`${type}Url`] === '#') {
      alert(type === 'driver' ? 'Driver chưa có sẵn để tải về' : 'Hướng dẫn chưa có sẵn');
      return false;
    }
    console.log(`${type === 'driver' ? 'Downloading' : 'Viewing'} ${type} for printer: ${printer.name}`);
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
      <div className={`loading-screen ${darkMode ? 'dark' : 'light'}`}>
        <div className="spinner"></div>
        <p>Đang tải danh sách máy in...</p>
      </div>
    );
  }

  return (
    <div className={`printer-list-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header với controls */}
      <div className="app-header">
        <div className="header-left">
          <FaPrint className="header-icon" />
          <h1>Quản lý Máy In</h1>
          <span className="printer-count">
            {printersData.length} máy in
          </span>
        </div>
        
        <div className="header-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm máy in, phòng ban, IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-box">
            <FaFilter className="filter-icon" />
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
            {darkMode ? <FaToggleOff /> : <FaToggleOn />}
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
                {groupName === "Đại Học" ? <FaUniversity /> : <FaSchool />}
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
                            <FaPrint className="printer-icon" />
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
                            <FaWifi />
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
                            <FaDownload />
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
                            <FaBook />
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
            <FaPrint className="empty-icon" />
            <h3>Không tìm thấy máy in nào</h3>
            <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="app-footer">
        <p>© 2024 Quản lý Máy In | Tổng số: {printersData.length} máy | Đang hiển thị: {Object.values(groupedPrinters).flat().length} máy</p>
      </div>
    </div>
  );
};

export default PrinterList;