/**
 * @author Doğuşcan Namal
 * @version 22.12.2017
 */
import React, {Component} from 'react';
import "./clicker.css";

const fonts = ['serif', 'sans-serif', 'cursive', 'fantasy', 'monospace'];

class Clicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            count: 0
        };
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.loadWtfs = this.loadWtfs.bind(this);
        this.loadWtfs();
    }

    render() {
        return (
            <div class="main">
                <p id="count">Count:{this.state.count}</p>
                <button type="image" src="./wtf.jpg" onMouseDown={this.mouseDown}
                        className="button-wtf"
                       onMouseUp={this.mouseUp}/>
                <button type="image" src="./wtf.jpg" onMouseDown={this.mouseDown}
                        className="button-next"
                        onMouseUp={this.mouseUp}/>
            </div>
        )
    }

    mouseDown(e) {
        console.log("mouseDown")
        e.preventDefault();
        this.setState({pressed: true});
        //this.loadWtfs();
    }

    mouseUp() {
        console.log("mouseUp")
        this.setState({pressed: false});
    }

    loadWtfs () {
        console.log("onLoad",this);
        let self = this;
        setInterval(function () {
            console.log("interval");
            if (self.state.pressed) {
                let div = document.createElement("div");
                div.textContent = "wtfdidIwatch?"
                div.classList.add("wtf")
                div.style.fontSize = (20 + Math.random() * 150 | 0) + "px"
                div.style.left = (Math.random() * (document.body.clientWidth - 100) | 0) + "px"
                div.style.color = "rgb(" + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + ")"
                div.style.fontFamily = fonts[Math.random() * fonts.length | 0]
                if (Math.random() > 0.7) {
                    div.style.textShadow = (1 + Math.random() * 20 | 0) + "px " + (1 + Math.random() * 20 | 0) + "px " + (1 + Math.random() * 20 | 0) + "px "
                        + "rgb(" + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + "," + (Math.random() * 255 | 0) + ")"
                }
                div.style.transform = "rotate(" + (Math.random() * 360 | 0) + "deg)"
                document.querySelector(".main").append(div);
                const nextCount = self.state.count + 1;
                self.setState((prevState,currentProps) => {
                    return {count: nextCount, pressed:false};
                });
                console.log(nextCount);
                document.querySelector("p").textContent = nextCount;
                let margin = 250
                let id = setInterval(function () {
                    div.style.top = (++margin) + "px"
                    if (margin === 600) {
                        div.remove()
                        clearInterval(id)
                    }
                }, 1 + Math.random() * 9 | 0)
            }
        }, 100)
    }
}

export default Clicker;