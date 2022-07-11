-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 5.7.24 - MySQL Community Server (GPL)
-- OS Server:                    Win64
-- HeidiSQL Versi:               10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Membuang data untuk tabel sidp.activities: ~51 rows (lebih kurang)
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` (`id`, `code`, `name`, `created_at`, `updated_at`) VALUES
	(7, '01.11', ' Penyediaan barang cetakan dan penggandaan ', NULL, NULL),
	(8, '01.12', ' Penyediaan komponen instalasi listrik / penerangan bangunan kantor ', NULL, NULL),
	(9, '01.13', ' Penyediaan Peralatan dan Perlengkapan Kantor ', NULL, NULL),
	(10, '01.18', ' Rapat-rapat koordinasi dan konsultasi ke luar daerah ', NULL, NULL),
	(11, '01.19', ' Penyediaan Jasa Administrasi Perkantoran ', NULL, NULL),
	(12, '02.22', 'Pemeliharaan rutin / berkala gedung kantor', NULL, NULL),
	(13, '02.24', 'Pemeliharaan rutin / berkala kendaraan dinas / operasional', NULL, NULL),
	(14, '02.30', 'Pemeliharaan rutin / berkala perlengkapan dan peralatan kantor', NULL, NULL),
	(15, '02.46', 'Penyediaan sarana gedung kantor', NULL, NULL),
	(16, '06.51', 'Peningkatan pengembangan sistem laporan', NULL, NULL),
	(17, '15.52', 'Penunjang Operasional Rumah Pintar', NULL, NULL),
	(18, '15.55', 'Pengembangan Kreatifitas Anak Usia Dini', NULL, NULL),
	(19, '15.56', 'Pengembangan Keprofesian Berkelanjutan (PKB) jenjang PAUD', NULL, NULL),
	(20, '15.66', 'Peningkatan Status TK Swasta menjadi TK Negeri', NULL, NULL),
	(21, '15.301', 'Pembangunan Prasarana Belajar SKB (DAK Tahun 2020)', NULL, NULL),
	(22, '15.302', 'Pengadaan Sarana Belajar SKB (DAK Tahun 2020)', NULL, NULL),
	(23, '15.303', 'Pengadaan Sarana Belajar PKBM (DAK Tahun 2020)', NULL, NULL),
	(24, '15.304', 'BOP Pendidikan Anak Usia Dini (PAUD)(DAK 2020)', NULL, NULL),
	(25, '15.305', 'BOP Pendidikan Kesetaraan (DAK 2020)', NULL, NULL),
	(26, '22.62', 'Ujian Paket A, Paket B, Paket C', NULL, NULL),
	(27, '22.74', 'Paving Halaman SD', NULL, NULL),
	(28, '22.75', 'Inventarisasi dan Pemutakhiran data Sarana dan Prasarana Sekolah Jenjang SD', NULL, NULL),
	(29, '22.81', 'Rehab/Peningkatan Sarana Prasarana Pendidikan SD (Perpus, Lab, UKS, dll)', NULL, NULL),
	(30, '22.83', 'Rehab Ruang Kelas SD', NULL, NULL),
	(31, '22.87', 'BOSDA (sekolah negeri)', NULL, NULL),
	(32, '22.89', 'Bantuan Oprerasional Sekolah Nasional (BOSNAS)', NULL, NULL),
	(33, '22.94', 'Pembangunan/Rehab Sanitasi/WC SMP', NULL, NULL),
	(34, '22.96', 'Rehab Ruang Kelas SMP', NULL, NULL),
	(35, '22.98', 'Pengadaan Alat-Alat Keterampilan/Praktek/Peraga/Multi Media SMP', NULL, NULL),
	(36, '24.76', 'OSN Siswa SMP', NULL, NULL),
	(37, '24.77', 'Olimpiade Olahraga Siswa Nasional SMP (O2SN)', NULL, NULL),
	(38, '24.78', 'PSB SMP', NULL, NULL),
	(39, '24.81', 'Ujian Nasional SMP', NULL, NULL),
	(40, '24.92', 'Lomba UKS jenjang SD', NULL, NULL),
	(41, '24.95', 'Sosialisasi Jafung, SKP, PKB, PKG dan Kenaikan Pangkat', NULL, NULL),
	(42, '24.113', 'Peningkatan Kesejahteraan Pendidik dan Tenaga Kependidikan Negeri', NULL, NULL),
	(43, '24.114', 'Operasional UPTD Sanggar Kegiatan Belajar Kota Samarinda', NULL, NULL),
	(44, '24.115', 'Peningkatan Kesejahteraan Pendidik dan Tenaga Kependidikan Swasta', NULL, NULL),
	(45, '24.121', 'Pemutakhiran Data dan Pengembangan Jaringan Teknologi Informasi Pendidikan', NULL, NULL),
	(46, '24.122', 'Pemetaan Standart Pelayanan Minimal Bidang Pendidikan', NULL, NULL),
	(47, '24.129', 'Ujian Akhir Sekolah Dasar/Madrasah Ibtidaiyah', NULL, NULL),
	(48, '24.130', 'OSN Siswa SD', NULL, NULL),
	(49, '24.132', 'Olimpiade Olahraga Siswa Nasional SD (O2SN)', NULL, NULL),
	(50, '24.133', 'PSB SD', NULL, NULL),
	(51, '24.134', 'Festival Lomba Seni Siswa (FLSS) Jenjang SD', NULL, NULL),
	(52, '24.135', 'Operasional Sekolah Inklusi', NULL, NULL),
	(53, '24.301', 'Rehabilitasi Prasarana Belajar SD (DAK 2020)', NULL, NULL),
	(54, '24.302', 'Pembangunan Prasarana Belajar SD (DAK 2020)', NULL, NULL),
	(55, '24.303', 'Pengadaan Sarana Belajar SD (DAK 2020)', NULL, NULL),
	(56, '24.304', 'Rehabilitasi Prasarana Belajar SMP (DAK 2020)', NULL, NULL),
	(57, '24.305', 'Pembangunan Prasarana Belajar SMP (DAK 2020)', NULL, NULL);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;

-- Membuang data untuk tabel sidp.jobs: ~54 rows (lebih kurang)
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` (`id`, `code`, `name`, `created_at`, `updated_at`) VALUES
	(132, '5.2.2.01.03', 'Belanja Alat Listrik Dan Elektronik (Lampu Pijar, Battery Kering)', NULL, NULL),
	(133, '5.2.2.01.05', 'Belanja Peralatan Kebersihan Dan Bahan Pembersih', NULL, NULL),
	(134, '5.2.2.01.06', 'Belanja Bahan Bakar Minyak/Gas', NULL, NULL),
	(135, '5.2.2.01.09', 'Belanja plakat / cenderamata / trophy', NULL, NULL),
	(136, '5.2.2.02.07', 'Belanja bahan dekorasi', NULL, NULL),
	(137, '5.2.2.02.11', 'Belanja bahan alat peraga/praktek sekolah', NULL, NULL),
	(138, '5.2.2.03.01', 'Belanja Telepon', NULL, NULL),
	(139, '5.2.2.03.02', 'Belanja Air', NULL, NULL),
	(140, '5.2.2.03.03', 'Belanja Listrik', NULL, NULL),
	(141, '5.2.2.03.05', 'Belanja Surat Kabar/Majalah', NULL, NULL),
	(142, '5.2.2.03.06', 'Belanja Kawat/Faksimili/Internet/Intranet/TV Kabel/TV Satelit', NULL, NULL),
	(143, '5.2.2.03.08', 'Belanja Jasa Transportasi dan Akomodasi', NULL, NULL),
	(144, '5.2.2.03.18', 'Belanja Jasa Publikasi', NULL, NULL),
	(145, '5.2.2.04.01', 'Belanja Premi Asuransi Kesehatan', NULL, NULL),
	(146, '5.2.2.05.01', 'Belanja Jasa Service', NULL, NULL),
	(147, '5.2.2.05.02', 'Belanja Penggantian Suku Cadang', NULL, NULL),
	(148, '5.2.2.05.03', 'Belanja Bahan Bakar Minyak/Gas Dan Pelumas', NULL, NULL),
	(149, '5.2.2.05.04', 'Belanja Jasa KIR', NULL, NULL),
	(150, '5.2.2.05.05', 'Belanja Pajak Kendaraan Bermotor', NULL, NULL),
	(151, '5.2.2.06.01', 'Belanja Cetak', NULL, NULL),
	(153, '5.2.2.06.02', 'Belanja Penggandaan', NULL, NULL),
	(154, '5.2.2.06.03', 'Belanja dokumentasi', NULL, NULL),
	(155, '5.2.2.07.02', 'Belanja Sewa Gedung/Kantor/Tempat', NULL, NULL),
	(156, '5.2.2.10.08', 'Belanja sewa sound system', NULL, NULL),
	(157, '5.2.2.11.02', 'Belanja Makanan Dan Minuman Rapat', NULL, NULL),
	(158, '5.2.2.11.03', 'Belanja Makanan Dan Minuman Tamu', NULL, NULL),
	(159, '5.2.2.11.04', 'Belanja makanan dan minuman pelatihan', NULL, NULL),
	(160, '5.2.2.11.05', 'Belanja makanan dan minuman Kegiatan', NULL, NULL),
	(161, '5.2.2.14.03', 'Belanja Pakaian Batik Tradisional', NULL, NULL),
	(162, '5.2.2.14.04', 'Belanja Pakaian Olahraga', NULL, NULL),
	(163, '5.2.2.15.02', 'Belanja Perjalanan Dinas Luar Daerah', NULL, NULL),
	(164, '5.2.2.20.05', 'Belanja Pemeliharaan Gedung dan Bangunan', NULL, NULL),
	(165, '5.2.2.20.14', 'Belanja Pemeliharaan Air Conditioner (AC)', NULL, NULL),
	(166, '5.2.2.20.15', 'Belanja Pemeliharaan Komputer', NULL, NULL),
	(167, '5.2.2.22.01', 'Belanja Barang Dana BOS', NULL, NULL),
	(168, '5.2.2.23.01', 'Belanja Barang / Jasa Yang Akan Diserahkan Kepada Masyarakat', NULL, NULL),
	(169, '5.2.2.23.02', 'Belanja Barang / Jasa Yang Akan Diserahkan Kepada Pihak Ketiga', NULL, NULL),
	(170, '5.2.2.26.01', 'Honorarium Tenaga Ahli/Instruktur/Narasumber', NULL, NULL),
	(171, '5.2.2.26.13', 'Honorarium Guru Swasta', NULL, NULL),
	(172, '5.2.2.27.01', 'Uang untuk Diberikan Kepada Pihak Ketiga', NULL, NULL),
	(173, '5.2.2.27.02', 'Uang untuk Diberikan Kepada Masyarakat', NULL, NULL),
	(174, '5.2.3.17.02', 'Belanja Modal Peralatan dan Mesin - Pengadaan Kendaraan Bermotor Penumpang', NULL, NULL),
	(175, '5.2.3.27.05', 'Belanja Modal Peralatan dan Mesin - Pengadaan Alat Kantor Lainnya', NULL, NULL),
	(176, '5.2.3.28.03', 'Belanja Modal Peralatan dan Mesin - Pengadaan Alat Pembersih', NULL, NULL),
	(177, '5.2.3.28.04', 'Belanja Modal Peralatan dan Mesin - Pengadaan Alat Pendingin', NULL, NULL),
	(178, '5.2.3.29.02', 'Belanja Modal Peralatan dan Mesin - Pengadaan Personal Komputer', NULL, NULL),
	(179, '5.2.3.29.05', 'Belanja Modal Peralatan dan Mesin - Pengadaan Peralatan Personal Komputer', NULL, NULL),
	(180, '5.2.3.31.01', 'Belanja Modal Peralatan dan Mesin - Pengadaan Peralatan Studio Visual', NULL, NULL),
	(181, '5.2.3.48.01', 'Belanja Modal Peralatan dan Mesin - Pengadaan Alat Bantu Kemanan', NULL, NULL),
	(182, '5.2.3.49.01', 'Belanja Modal Gedung dan Bangunan - Pengadaan Bangunan Gedung Kantor', NULL, NULL),
	(183, '5.2.3.49.10', 'Belanja Modal Gedung dan Bangunan - Pengadaan Bangunan Gedung Tempat Pendidikan', NULL, NULL),
	(184, '5.2.3.59.05', 'Belanja Modal Jalan, Irigasi dan Jaringan - Pengadaan Jalan Khusus', NULL, NULL),
	(185, '5.2.3.67.01', 'Belanja Modal Jalan, Irigasi dan Jaringan - Pengadaan Bangunan Pembawa Air Kotor', NULL, NULL),
	(186, '5.2.3.90.01', 'Belanja Modal Dana BOS', NULL, NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;

-- Membuang data untuk tabel sidp.person_charge: ~4 rows (lebih kurang)
/*!40000 ALTER TABLE `person_charge` DISABLE KEYS */;
INSERT INTO `person_charge` (`id`, `name`, `nip`, `created_at`, `updated_at`) VALUES
	(24, 'M. Umar Hadi, S.Pd.', '19700417 198903 1003', '2020-04-05 02:34:28', '2020-04-05 02:34:28'),
	(25, 'Chusnul Muawanah, S.T., MM.', '19800104 200901 2004', '2020-04-05 02:34:43', '2020-04-05 02:34:43'),
	(26, 'Muh. Mukhlis, S.Pd.', '19721110 200502 1001', '2020-04-05 02:35:00', '2020-04-05 02:35:00'),
	(30, 'Nuraina', '19700417 198903 1004', '2020-04-07 12:35:04', '2020-04-07 12:35:04');
/*!40000 ALTER TABLE `person_charge` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
