// 이메일 도메인 선택 기능
document.addEventListener('DOMContentLoaded', function() {
    // 이메일 관련 요소 선택
    const emailSelect = document.querySelector('.email-input .form-select');
    const emailDomain = document.querySelector('.email-input input[placeholder="직접입력"]');
    
    // 이메일 선택 변경 이벤트 리스너
    if (emailSelect) {
        emailSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            
            // "선택" 옵션이 아닌 경우에만 도메인 입력 필드에 반영
            if (selectedValue !== '선택') {
                emailDomain.value = selectedValue;
                emailDomain.setAttribute('readonly', true);
                emailDomain.style.backgroundColor = '#f8f9fa';
            } else {
                // "선택" 옵션인 경우 입력 필드 초기화
                emailDomain.value = '';
                emailDomain.removeAttribute('readonly');
                emailDomain.style.backgroundColor = '';
            }
        });
    }
    
    // 탭 버튼 기능
    const serviceTypeInputs = document.querySelectorAll('input[name="serviceType"]');
    const joinTypeInputs = document.querySelectorAll('input[name="joinType"]');
    
    // 서비스 유형 탭 버튼 이벤트
    serviceTypeInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            console.log('서비스 유형 변경:', this.value);
            // 필요한 경우 추가 로직 구현
        });
    });
    
    // 가입 유형 탭 버튼 이벤트
    joinTypeInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            console.log('가입 유형 변경:', this.value);
            // 필요한 경우 추가 로직 구현
        });
    });
    
    // 첨부 파일 관련 요소
    const businessLicenseInput = document.getElementById('businessLicense');
    const idCardInput = document.getElementById('idCard');
    const businessLicenseFileName = document.getElementById('businessLicenseFileName');
    const idCardFileName = document.getElementById('idCardFileName');
    const businessLicensePreviewContainer = document.getElementById('businessLicensePreviewContainer');
    const idCardPreviewContainer = document.getElementById('idCardPreviewContainer');
    const businessLicenseThumbnail = document.getElementById('businessLicenseThumbnail');
    const idCardThumbnail = document.getElementById('idCardThumbnail');
    const businessLicenseBtn = document.getElementById('businessLicenseBtn');
    const idCardBtn = document.getElementById('idCardBtn');
    
    // 파일 수정 삭제 버튼
    const businessLicenseEdit = document.getElementById('businessLicenseEdit');
    const businessLicenseDelete = document.getElementById('businessLicenseDelete');
    const idCardEdit = document.getElementById('idCardEdit');
    const idCardDelete = document.getElementById('idCardDelete');
    
    // 미리보기 모달 관련 요소
    const filePreviewModal = document.getElementById('filePreviewModal') ? new bootstrap.Modal(document.getElementById('filePreviewModal')) : null;
    const filePreviewLarge = document.getElementById('filePreviewLarge');
    const filePreviewModalTitle = document.getElementById('filePreviewModalTitle');
    
    // 사업자 등록증 파일 저장 변수
    let businessLicenseFile = null;
    let businessLicenseUrl = null;
    
    // 대표자 신분증 파일 저장 변수
    let idCardFile = null;
    let idCardUrl = null;
    
    // 사업자 등록증 파일 선택 이벤트
    if (businessLicenseInput) {
        businessLicenseInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                businessLicenseFile = this.files[0];
                const fileName = businessLicenseFile.name;
                
                // 파일명 표시
                businessLicenseFileName.textContent = fileName;
                
                // 기존 URL 해제
                if (businessLicenseUrl) {
                    URL.revokeObjectURL(businessLicenseUrl);
                }
                
                // 썸네일 생성
                businessLicenseUrl = URL.createObjectURL(businessLicenseFile);
                
                if (businessLicenseFile.type.includes('pdf')) {
                    // PDF 파일인 경우
                    businessLicenseThumbnail.style.backgroundImage = '';
                    businessLicenseThumbnail.classList.add('pdf-thumbnail');
                } else {
                    // 이미지 파일인 경우
                    businessLicenseThumbnail.style.backgroundImage = `url(${businessLicenseUrl})`;
                    businessLicenseThumbnail.classList.remove('pdf-thumbnail');
                }
                
                // 미리보기 컨테이너 보이기
                businessLicensePreviewContainer.style.display = 'block';
                // 업로드 버튼 감추기
                businessLicenseBtn.style.display = 'none';
                
                console.log('사업자 등록증 파일 선택:', fileName);
            }
        });
    }
    
    // 대표자 신분증 파일 선택 이벤트
    if (idCardInput) {
        idCardInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                idCardFile = this.files[0];
                const fileName = idCardFile.name;
                
                // 파일명 표시
                idCardFileName.textContent = fileName;
                
                // 기존 URL 해제
                if (idCardUrl) {
                    URL.revokeObjectURL(idCardUrl);
                }
                
                // 썸네일 생성
                idCardUrl = URL.createObjectURL(idCardFile);
                
                if (idCardFile.type.includes('pdf')) {
                    // PDF 파일인 경우
                    idCardThumbnail.style.backgroundImage = '';
                    idCardThumbnail.classList.add('pdf-thumbnail');
                } else {
                    // 이미지 파일인 경우
                    idCardThumbnail.style.backgroundImage = `url(${idCardUrl})`;
                    idCardThumbnail.classList.remove('pdf-thumbnail');
                }
                
                // 미리보기 컨테이너 보이기
                idCardPreviewContainer.style.display = 'block';
                // 업로드 버튼 감추기
                idCardBtn.style.display = 'none';
                
                console.log('대표자 신분증 파일 선택:', fileName);
            }
        });
    }
    
    // 사업자 등록증 썸네일 클릭 이벤트 - 모달 열기
    if (businessLicenseThumbnail) {
        businessLicenseThumbnail.addEventListener('click', function() {
            showFilePreview('사업자 등록증', businessLicenseFile, businessLicenseUrl);
        });
    }
    
    // 대표자 신분증 썸네일 클릭 이벤트 - 모달 열기
    if (idCardThumbnail) {
        idCardThumbnail.addEventListener('click', function() {
            showFilePreview('대표자 신분증', idCardFile, idCardUrl);
        });
    }
    
    // 사업자 등록증 수정 버튼 클릭 이벤트
    if (businessLicenseEdit) {
        businessLicenseEdit.addEventListener('click', function() {
            businessLicenseInput.click();
        });
    }
    
    // 사업자 등록증 삭제 버튼 클릭 이벤트
    if (businessLicenseDelete) {
        businessLicenseDelete.addEventListener('click', function() {
            // 파일 선택 초기화
            businessLicenseInput.value = '';
            businessLicenseFileName.textContent = '';
            
            // 미리보기 컨테이너 숨기기
            businessLicensePreviewContainer.style.display = 'none';
            // 업로드 버튼 보이기
            businessLicenseBtn.style.display = 'inline-flex';
            
            // URL 해제
            if (businessLicenseUrl) {
                URL.revokeObjectURL(businessLicenseUrl);
                businessLicenseUrl = null;
            }
            
            businessLicenseFile = null;
        });
    }
    
    // 대표자 신분증 수정 버튼 클릭 이벤트
    if (idCardEdit) {
        idCardEdit.addEventListener('click', function() {
            idCardInput.click();
        });
    }
    
    // 대표자 신분증 삭제 버튼 클릭 이벤트
    if (idCardDelete) {
        idCardDelete.addEventListener('click', function() {
            // 파일 선택 초기화
            idCardInput.value = '';
            idCardFileName.textContent = '';
            
            // 미리보기 컨테이너 숨기기
            idCardPreviewContainer.style.display = 'none';
            // 업로드 버튼 보이기
            idCardBtn.style.display = 'inline-flex';
            
            // URL 해제
            if (idCardUrl) {
                URL.revokeObjectURL(idCardUrl);
                idCardUrl = null;
            }
            
            idCardFile = null;
        });
    }
    
    // 미리보기 모달 표시 함수
    function showFilePreview(title, file, url) {
        // 모달 제목 설정
        filePreviewModalTitle.textContent = `${title} 미리보기`;
        
        // 미리보기 내용 초기화
        filePreviewLarge.innerHTML = '';
        
        if (file.type.includes('pdf')) {
            // PDF 파일인 경우 iframe으로 표시
            const iframe = document.createElement('iframe');
            iframe.src = url;
            filePreviewLarge.appendChild(iframe);
        } else {
            // 이미지 파일인 경우
            const img = document.createElement('img');
            img.src = url;
            filePreviewLarge.appendChild(img);
        }
        
        // 모달 열기
        filePreviewModal.show();
    }
    
    // 동의 체크박스 기능
    const agreeAllCheckbox = document.getElementById('agreeAll');
    
    // 약관동의 모달
    const agreementAlertModal = document.getElementById('agreementAlertModal') ? new bootstrap.Modal(document.getElementById('agreementAlertModal')) : null;
    
    // 상담신청 버튼 클릭 이벤트
    const btnSubmit = document.getElementById('btnSubmit');
    const btnNext = document.querySelector('.btn.btn-next');  // step1.html의 상담신청하기 버튼
    
    // step3.html의 상담신청 버튼
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function(e) {
            if (!agreeAllCheckbox.checked) {
                e.preventDefault();
                agreementAlertModal.show();
            }
        });
    }
    
    // step1.html의 상담신청 버튼
    if (btnNext && !btnSubmit) {
        btnNext.addEventListener('click', function(e) {
            if (!agreeAllCheckbox.checked) {
                e.preventDefault();
                agreementAlertModal.show();
            }
        });
    }
    
    // 모달이 열릴 때 이벤트 - 정중앙 배치
    document.getElementById('agreementAlertModal').addEventListener('shown.bs.modal', function () {
        const modalDialog = this.querySelector('.modal-dialog');
        
        // 화면 중앙에 모달 배치
        const windowHeight = window.innerHeight;
        const modalHeight = modalDialog.clientHeight;
        const marginTop = Math.max(0, (windowHeight - modalHeight) / 2);
        
        modalDialog.style.marginTop = marginTop + 'px';
    });
    
    // 모두 동의합니다 체크박스 이벤트 리스너
    if (agreeAllCheckbox) {
        agreeAllCheckbox.addEventListener('change', function() {
            // 추후 개별 동의 체크박스 추가 시 활용
        });
    }
}); 