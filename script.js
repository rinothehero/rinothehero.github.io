// 이미지 컨테이너 가져오기
const imageContainer = document.querySelector(".image-container img");

// 이미지 경로 배열 (특정 폴더의 이미지들)
const frontImagePaths = [
  "Front/1.jpeg",
  "Front/2.jpeg",
  "Front/3.jpeg",
  "Front/4.jpeg",
  "Front/5.jpeg",
];

// 현재 이미지 인덱스
let currentFrontIndex = 0;

// 이미지 변경 함수
function changeImage() {
  currentFrontIndex = (currentFrontIndex + 1) % frontImagePaths.length; // 인덱스 순환
  imageContainer.src = frontImagePaths[currentFrontIndex]; // 이미지 경로 변경
}

// 0.5초(500ms) 주기로 이미지 변경
setInterval(changeImage, 2000);

// 모든 줄 가져오기
const lines = document.querySelectorAll(".content-container .line");
const new_lines = document.querySelectorAll(".left-section .newline");

// 각 줄을 순차적으로 표시하는 함수
function showLines() {
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1"; // 줄을 보이게 설정
    }, index * 2000); // 각 줄마다 지연 시간 (0.5초 간격)
  });
}
function hideNewLines() {
  new_lines.forEach((line) => {
    if (line.style.opacity !== "0") {
      // 이미 숨겨진 상태가 아니면
      line.classList.remove("transition");
    }
  });
  new_lines.forEach((line) => {
    if (line.style.opacity !== "0") {
      // 이미 숨겨진 상태가 아니면
      line.style.opacity = "0"; // 줄을 숨김
    }
  });
}

// 줄 보이기 함수
function showNewLines() {
  new_lines.forEach((line, index) => {
    if (line.style.opacity !== "1") {
      // 이미 보이는 상태가 아니면
      line.classList.add("transition");
      setTimeout(() => {
        line.style.opacity = "1"; // 줄을 보이게 설정
      }, index * 1000); // 각 줄마다 지연 시간 (1.5초 간격)
    }
  });
}
// 페이지 로드 시 실행
window.addEventListener("DOMContentLoaded", showLines);

const container = document.querySelector(".card-container");
const leftTitle = document.getElementById("left-title");
const leftContent = document.getElementById("left-content");
const left_extra = document.getElementById("left-extra");
const scrollBtn = document.getElementById("scroll-btn");

// 버튼 클릭 이벤트 핸들러
scrollBtn.addEventListener("click", () => {
  // 다음 섹션으로 부드럽게 스크롤
  window.scrollTo({
    top: window.innerHeight, // 다음 페이지 위치 (뷰포트 높이만큼 아래로)
    behavior: "smooth", // 부드러운 스크롤 효과
  });

  // 1초 지연 후 showNewLines 실행
  setTimeout(() => {
    showNewLines(); // 함수 호출
  }, 1000); // 1000ms = 1초
});

// 이미지 경로 배열
const imagePaths = [
  "images/IMG_0932.jpeg",
  "images/IMG_0950.JPG",
  "images/IMG_0948.JPG",
  "images/IMG_0963.JPG",
  "images/lp_image2.jpeg",
  "images/IMG_1042.jpeg",
  "images/IMG_1182.jpeg",
  "images/IMG_1223.jpeg",
  "images/IMG_1246.jpeg",
  "images/IMG_1341.jpeg",
  "images/IMG_1395.JPG",
  "images/IMG_9414.jpeg",
  "images/IMG_1654 2.jpeg",
  "images/IMG_1681.jpeg",
  "images/IMG_1710.jpeg",
];

// 카드 정보 배열 (예시)
const cardDetails = [
  { title: "12/23/2024", content: "우리가 처음 만난 날." },
  { title: "12/24/2024", content: "미친 두부 전골" },
  { title: "12/24/2024", content: "처음 함께 찍은 사진" },
  { title: "12/26/2024", content: "스키장에서 첫 키스" },
  { title: "12/30/2024", content: "영통 이재빈 귀여워" },
  { title: "12/31/2024", content: "하루 먼저 일출을 보았다 !" },
  { title: "1/7/2025", content: "분당에서 강준혁 병원 보내기" },
  { title: "1/9/2024", content: "부부동반 데이트 !" },
  { title: "1/14/2025", content: "첫 능라도 ㅎㅎ" },
  { title: "1/21/2025", content: "우리의 글램핑" },
  { title: "1/26/2025", content: "배스킨라빈스 100가지 맛" },
  { title: "1/26/2025", content: "멋쟁이 우리들" },
  { title: "1/26/2025", content: "재빈이 차 타고 브런치" },
  { title: "2/12/2025", content: "스크린 짜장면 !" },
  { title: "2/14/2025", content: "우리의 첫 발렌타인" },
];

// 동적으로 카드 생성
imagePaths.forEach((imagePath, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-index", index);

  card.innerHTML = `
        <img src="${imagePath}" class="card-img" alt="Photo ${index + 1}" />
        <button class="popup-btn" data-image="${imagePath}">View Full</button>
        <div class="card-content">
            <h3>Card ${index + 1}</h3>
            <p>Description for card ${index + 1}</p>
        </div>
    `;
  container.appendChild(card);
});

// 현재 활성화된 카드 인덱스
let currentIndex = 0; // 초기 중앙 인덱스

// 초기 위치 설정
updateCardPosition();

// 클릭 이벤트 핸들러
container.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");
  if (!clickedCard) return;

  // 클릭된 카드의 인덱스 가져오기
  const index = parseInt(clickedCard.getAttribute("data-index"));

  // 현재 인덱스를 업데이트하고 위치 조정
  currentIndex = index;

  // 모든 카드의 "focused" 클래스 제거
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("focused");
    card.style.zIndex = "1"; // 기본값으로 초기화
  });
  hideNewLines();
  // 클릭된 카드에 "focused" 클래스 추가 및 z-index 설정
  clickedCard.classList.add("focused");
  clickedCard.style.zIndex = "10"; // 가장 위로 설정

  // 좌측 섹션 업데이트

  setTimeout(() => {
    updateLeftSection(index);
  }, index * 500); // 각 줄마다 지연 시간 (0.5초 간격)

  // 컨테이너 위치 업데이트
  updateCardPosition();
});

// 좌측 섹션 업데이트 함수
function updateLeftSection(index) {
  const { title, content } = cardDetails[index];

  leftTitle.textContent = title; // 제목 업데이트
  leftContent.textContent = content; // 내용 업데이트
  left_extra.textContent = null;
  showNewLines(); // 줄 보이기
}

// 카드 위치 업데이트 함수
function updateCardPosition() {
  const cardWidth = document.querySelector(".card").offsetWidth + 10; // 각 카드의 너비 + 간격
  const containerWidth = document.querySelector(".card-wrapper").offsetWidth;

  // 중앙에 위치해야 할 카드를 기준으로 컨테이너 이동 계산
  const offset =
    containerWidth / 2 - cardWidth / 2 - currentIndex * cardWidth - 2000;

  // 컨테이너 이동
  container.style.transform = `translateX(${offset}px)`;
}

// 모달 요소 가져오기
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

// 카드 컨테이너에서 팝업 버튼 클릭 이벤트 처리
container.addEventListener("click", (e) => {
  const popupBtn = e.target.closest(".popup-btn");

  if (!popupBtn) return; // 클릭한 요소가 팝업 버튼이 아니면 종료

  // 이미지 경로 가져오기
  const imagePath = popupBtn.getAttribute("data-image");

  // 모달에 이미지 표시
  modalImage.src = imagePath;

  // 모달 보이기
  modal.classList.remove("hidden");
});

// 닫기 버튼 클릭 이벤트 처리
closeModal.addEventListener("click", () => {
  // 모달 숨기기
  modal.classList.add("hidden");
});

// 모달 외부 클릭 시 닫기 (옵션)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    // 배경 클릭 시만 닫힘
    modal.classList.add("hidden");
  }
});
