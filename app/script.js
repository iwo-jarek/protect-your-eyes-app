import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  state = {
    status: "off",
    time: 1200,
    timer: null,
  };
  count = () => {
    const newTime = this.state.time - 1;
    this.setState({
      time: newTime,
    });
    if (this.state.time === 0) {
      if (this.state.status === "work") {
        this.setState({ status: "rest", time: 20 });
        this.playBell();
      } else if (this.state.status === "rest") {
        this.setState({
          status: "work",
          time: 1200,
        });
        this.playBell();
      }
    }
  };

  playBell = () => {
    const bell = new Audio("./sounds/bell.wav");
    bell.play();
  };

  render() {
    const { status, time, timer } = this.state;
    const formatTime = (time) => {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time - minutes * 60);

      if (minutes < 10) minutes = "0" + minutes.toString();
      if (seconds < 10) seconds = "0" + seconds.toString();

      return minutes + ":" + seconds;
    };

    const startTimer = () => {
      this.setState({
        time: 8,
        status: "work",
        timer: setInterval(this.count, 1000),
      });
    };

    const stopTimer = () => {
      clearInterval(timer);
      this.setState({ status: "off" });
    };

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === "off" && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {status === "work" && <img src="./images/work.png" />}
        {status === "rest" && <img src="./images/rest.png" />}
        {status !== "off" && <div className="timer">{formatTime(time)}</div>}
        {status === "off" && (
          <button className="btn" onClick={() => startTimer()}>
            Start
          </button>
        )}
        {status !== "off" && (
          <button className="btn" onClick={() => stopTimer()}>
            Stop
          </button>
        )}
        <button className="btn btn-close">X</button>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
