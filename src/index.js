// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. 페이지가 로드 된 시점에 ID 입력창에 Focus가 되어있어야한다.
// 대상 : ID 입력 input
// 이벤트 : 페이지(window)가 로드 되었을 때
// 핸들러 : Focus()

//$변수명 : dom의 element이다.
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')

window.addEventListener('load', () => {
  $id.focus()
})

// 2. 유효성 검사 로직
// 대상 : ID, 비밀번호, 비밀번호 확인 input
// 이벤트 : (1) input이 focus out (2)가입하기 버튼을 눌렀을 때
// 핸들러 : (1) 해당 input의 유효성 검사 (2)모든 필드의 유효성 검사

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
  required: '필수 정보입니다.',
  invalidId: '5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능',
  invalidPw: '8~16자. 영문 대/소문자, 숫자 사용 가능',
  invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

// 3. 커스텀 에러 메시지
// (1) 비어 있을 때 (2) 유효하지 않은 값일때

const checkRegex = (target) => {
  //destructuring => const value = target.value, const id = target.id
  const { value, id } = target
  if (value.length === 0) {
    return 'required'
  } else {
    switch (id) {
      case 'id':
        return ID_REGEX.test(value) ? true : 'invalidId'
      case 'pw':
        return PW_REGEX.test(value) ? true : 'invalidPw'
      case 'pw-check':
        return $pw.value === value ? true : 'invalidPwCheck'
    }
  }
}

const checkValidation = (target, msgTarget) => {
  const isValid = checkRegex(target)
  if (isValid !== true) {
    target.classList.add('border-red-600')
    msgTarget.innerText = ERROR_MSG[isValid]
  } else {
    target.classList.remove('border-red-600')
    msgTarget.innerText = ''
  }
  return isValid
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))
$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))
$pwCheck.addEventListener('focusout', () =>
  checkValidation($pwCheck, $pwCheckMsg)
)

// 4. 입력 확인 모달 창 구현
const $submit = document.getElementById('submit')
const $confirmPw = document.getElementById('confirm-pw')
const $confirmId = document.getElementById('confirm-id')
const $modal = document.getElementById('modal')

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$submit.addEventListener('click', (e) => {
  e.preventDefault()
  const isValidForm =
    checkValidation($id, $idMsg) === true &&
    checkValidation($pw, $pwMsg) === true &&
    checkValidation($pwCheck, $pwCheckMsg) === true
  if (isValidForm) {
    $confirmId.innerText = $id.value
    $confirmPw.innerText = $pw.value
    $modal.showModal()
  }
})

$approveBtn.addEventListener('click', () => {
  window.alert('가입되었습니다 🥳')
  $modal.close()
})

$cancelBtn.addEventListener('click', () => {
  $modal.close()
})

// 5. 폰트 사이즈 조절 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
  return parseFloat(window.getComputedStyle($html).fontSize)
}
$increaseFontBtn.addEventListener('click', () => {
  onClickFontSizeControl('increase')
  // // font size +1px
  // // Dom.style.fontSize = "" -> 인라인 css 값만 콘솔에 찍힌다.
  // const nextFontSize = getHtmlFontSize() + 1
  // $html.style.fontSize = nextFontSize
  // // 만약 20px 이상이면 increase 비활
  // if (nextFontSize >= MAX_FONT_SIZE) {
  //   $increaseFontBtn.disabled = true
  // }
  // if (nextFontSize > MIN_FONT_SIZE) {
  //   $decreaseFontBtn.disabled = false
  // }
})
$decreaseFontBtn.addEventListener('click', () => {
  onClickFontSizeControl('decrease')
  // // font size -1px
  // const nextFontSize = getHtmlFontSize() - 1
  // $html.style.fontSize = nextFontSize
  // // 만약 12px 이하이면 decrease 비활
  // if (nextFontSize <= MIN_FONT_SIZE) {
  //   $decreaseFontBtn.disabled = true
  // }
  // if (nextFontSize < MAX_FONT_SIZE) {
  //   $increaseFontBtn.disabled = false
  // }
})

const onClickFontSizeControl = (flag) => {
  const fontSize = getHtmlFontSize()
  let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
  $html.style.fontSize = newFontSize
  $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
  $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
