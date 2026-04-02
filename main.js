document.addEventListener('DOMContentLoaded', () => {
    const glampingForm = document.getElementById('glampingForm');
    const successModal = document.getElementById('successModal');
    const submitBtn = document.getElementById('submitBtn');

    // Apps Script 웹 앱 URL (배포 후 이곳에 붙여넣기)
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfY0spHZpn0NdjwD5qwVfBG7Xp_7YHOXncI7jxcFhzu7bctQJ59Hb8jBSw1ZlSfIC_/exec';

    glampingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 버튼 비활성화 (중복 클릭 방지)
        submitBtn.disabled = true;
        submitBtn.innerText = '처리 중...';

        const formData = new FormData(glampingForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log('Sending data:', data);

        try {
            // 실제 배포 시에는 SCRIPT_URL로 fetch를 보냅니다.
            // 현재는 시뮬레이션을 위해 1.5초 대기 후 성공 처리를 합니다.

            if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.warn('Google Apps Script URL이 설정되지 않았습니다. 시뮬레이션 모드로 작동합니다.');
                await new Promise(resolve => setTimeout(resolve, 1500));
                showSuccess();
            } else {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Apps Script의 CORS 제한 우회
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'text/plain', // application/json 대신 text/plain 사용
                    },
                    body: JSON.stringify(data),
                });

                showSuccess();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = '신청하기';
        }
    });
});

function showSuccess() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.getElementById('glampingForm').reset();
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// 창 바깥 클릭 시 모달 닫기
window.onclick = function (event) {
    const modal = document.getElementById('successModal');
    if (event.target == modal) {
        closeModal();
    }
}
