// URL API trả về danh sách phim Studio Ghibli (định dạng JSON)
const STUDIO_GHIBLI_API = 'https://ghibliapi.vercel.app/films';

// Khi trang web tải xong, tự động gọi hàm taiPhim() để lấy dữ liệu từ API
window.onload = function() {
  taiPhim();
};

// 1) Tải danh sách phim từ API và hiển thị
// Quy trình: ấn gọi fetch API -> kiểm tra phản hồi -> chuyển JSON -> render ra UI
async function taiPhim() {
  try {
    // Báo cho người dùng biết đang tải dữ liệu
    document.getElementById('movieList').innerHTML = '<p>Đang tải phim đợi tí nhé...</p>';
    // Gọi API bằng fetch, await để đợi kết quả
    const response = await fetch(STUDIO_GHIBLI_API);
    if (!response.ok) throw new Error('Không thể tải dữ liệu');
    // Chuyển phản hồi thành JSON
    const data = await response.json();
    // Gọi hàm hiển thị danh sách phim lên trang
    renderFilms(data);
  } catch (error) {
    // Nếu fetch lỗi mạng thì sẽ vào đây
    document.getElementById('movieList').innerHTML = '<p>Không thể tải dữ liệu từ API.</p>';
  }
}
// 3) Hiển thị danh sách phim ra giao diện
// Duyệt mảng phim và tạo HTML đơn giản: poster + Tên + năm + vài thông tin

function renderFilms(films) {
  // Dùng map() để tạo HTML cho từng phim, sau đó join() để nối thành chuỗi
  const html = films.map(phim =>
    `<div class="movie-card">
      <img src="${phim.image}" alt="${phim.title}">
      <h3>${phim.title}</h3>
      <p><strong>Năm:</strong> ${phim.release_date}</p>
      <p><strong>Đạo diễn:</strong> ${phim.director}</p>
      <p><strong>Điểm:</strong> ${phim.rt_score}/100</p>
      <p><strong>Mô tả:</strong> ${phim.description}</p>
    </div>`
  ).join('');

  // Gắn chuỗi HTML vào thẻ hiển thị danh sách phim
  document.getElementById('movieList').innerHTML = html;
}