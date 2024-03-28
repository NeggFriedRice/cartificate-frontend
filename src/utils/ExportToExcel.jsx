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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.5, opacity: 0.5}}
        src="excel.svg" className="h-[35px] absolute right-[180px] top-[3px] max-lg:h-[22px] max-lg:right-[100px] max-lg:top-[0px]" />
    </button>
  )
}
