import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
import { motion } from 'framer-motion'

export default function ExportToExcel({ excelData }) {

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, "maintenance.xlsx");
    };
  return (
    <button onClick={(e) => exportToExcel()}>
        <motion.img 
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.85, opacity: 0.5}}
        src="download.svg" className="h-[35px] max-lg:h-[22px] mx-2" />
    </button>
  )
}
