var UA= function () {
  var ua = navigator.userAgent
  if (ua.indexOf('FDCAPP') > -1) {
    return 'fdc'
  }
  if (ua.indexOf('UCBrowser') > -1) {
    return 'uc'
  }
  if (ua.indexOf('MicroMessenger') > -1) {
    return 'wx'
  }
  if (ua.indexOf('MQQBrowser') > -1 && ua.indexOf('QQ/') === -1) {
    return 'qqBrowser'
  }
  if (ua.indexOf('QQ/') > -1) {
    return 'qq'
  }
  if (ua.indexOf('Chrome') > -1) {
    return 'chrome'
  }
  if (ua.indexOf('Safari') > -1) {
    return 'safari'
  }
  return 'other'
}

// 房源详情返回上一页
$("body").on("click","#back",function(e){
  e.preventDefault()
  var backMeta = document.querySelector('meta[name="backUrl"]')
  var backUrl = (backMeta && backMeta.getAttribute('content')) || '/'

  if (UA() === 'fdc') {
      window.location.href = 'fdcapi://back'
      return
  }

  // 直接打开
  if (window.history.length === 1) {
    replace()
    return
  }
  // 输入地址打开
  if (document.referrer &&
      document.referrer.indexOf('fdc') !== -1 &&
      document.referrer !== window.sessionStorage.getItem('backUrl')) {
      back()
  } else {
      replace()
  }
  function replace(){
    window.sessionStorage.setItem('backUrl',window.location.href)
    window.location.replace(backUrl)
  }
  function back(){
      // window.sessionStorage.removeItem('backUrl')
      window.history.back()
  }
});

var backMeta = document.querySelector('meta[name="backUrl"]')
var backUrl = (backMeta && backMeta.getAttribute('content')) || '/'
var str = ''
str += 'UA----'+ UA() +'</br>'
str += 'href----'+ window.location.href +'</br>'
str += 'backUrl----'+ backUrl +'</br>'
str += 'referrer----'+ document.referrer+'</br>'
str += 'sessionStorage----'+ window.sessionStorage.getItem('backUrl')+'</br>'
str += 'historyLength----'+ window.history.length+'</br>'
$('#content').html(str)
