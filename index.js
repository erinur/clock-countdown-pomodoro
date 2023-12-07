$(document).ready(function(){
  const breakUp = $("#break-increment")
  const breakDown = $("#break-decrement")
  const breakTime = $("#break-length")
  const sessionUp = $("#session-increment")
  const sessionDown = $("#session-decrement")
  const sessionTime = $("#session-length")
  const timeLabel = $("#timer-label")
  const timeLeft = $("#time-left")
  const startStop = $("#start_stop")
  const resetButton = $("#reset")
  const snd = $("#beep")
  const timer = $("#timer")

  const standarColor = {
    'background-color': 'var(--medium-grey)',
    'color': 'var(--dark-purple)'
  }

  const alertColor = {
    'background-color': 'var(--purple)',
    'color': 'var(--ligth-grey)'
  }


  let minutes
  let seconds
  let breakInit
  let sessionInit
  let onOffState
  let sessionBreakState
  let time
  const timerDate = new Date()

  breakDown.on('click', function(){
    breakDecrement()
  })

  breakUp.on('click', function(){
    breakIncrement()
  })

  sessionDown.on('click', function(){
    sessionDecrement()
  })

  sessionUp.on('click', function(){
    sessionIncrement()
  })

  startStop.on("click", function(){
    if(onOffState === "off"){
      CountDown()
      onOffState = "on"
    } else {
      onOffState ="off"
    }
  })

  resetButton.on("click", function(){
    reset()
  })

  reset()

  function stablishTime(){
    if(minutes === 60){
      timeLeft.text('60:00')
    } else {
      timerDate.setMinutes(minutes, seconds)
      time = timerDate.toTimeString().slice(3, 8);
      timeLeft.text(time)
    }
  }

  function breakIncrement(){
    if(breakInit<60)
    breakInit++
    breakTime.text(breakInit)
  }

  function breakDecrement(){
    if(breakInit>1)
    breakInit--
    breakTime.text(breakInit)
  }

  function sessionIncrement(){
    if(sessionInit<60)
      sessionInit++
      sessionTime.text(sessionInit)
      minutes = sessionInit
      stablishTime()
  }

  function sessionDecrement(){
    if(sessionInit>1)
    sessionInit--
    sessionTime.text(sessionInit)
    minutes = sessionInit
    stablishTime()
  }
  
  function CountDown() {
    const interval = setInterval(countDownConditions, 1000)

    function stopCountDown() {
      clearInterval(interval);
      onOffState = "off"
    }

    function countDownConditions() {
      if(onOffState === "off") {
        stopCountDown()
      } else if(timeLeft.text() === "60:00" && sessionBreakState === "session"){
        minutes = 59
        seconds = 59
      } else if(time === "00:00" && sessionBreakState === "session"){
        snd[0].play()
        breakMoment()
      } else if(time === "00:00" && sessionBreakState === "break"){
        snd[0].play()
        sessionMoment()
      } else if(time <= "01:00"){
        timer.css(alertColor)
        seconds--
      } else {
        seconds--
      }
      stablishTime()
    }
  }

  function reset(){
    breakInit = 5
    sessionInit = 25
    minutes = sessionInit
    seconds = 0
    onOffState ="off"
    sessionBreakState = "session"
    breakTime.text(breakInit)
    sessionTime.text(sessionInit)
    timeLabel.text("Session")
    timer.css(standarColor)
    stablishTime()
    snd[0].pause()
    snd[0].currentTime = 0
  }

  function breakMoment(){
    minutes = breakInit
    seconds = 0
    onOffState ="on"
    sessionBreakState = "break"
    timeLabel.text("Break")
    timer.css(standarColor)
    stablishTime()
  }

  function sessionMoment(){
    minutes = sessionInit
    seconds = 0
    onOffState ="on"
    sessionBreakState = "session"
    timeLabel.text("Session")
    timer.css({'background-color': 'inherit', 'color': 'black'})
    stablishTime()
  }
  
})