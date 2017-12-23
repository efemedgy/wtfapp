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
        this._mouseDownPrev = this._mouseDownPrev.bind(this);
        this._mouseUpPrev = this._mouseUpPrev.bind(this);
        this._mouseDownNext = this._mouseDownNext.bind(this);
        this._mouseUpNext = this._mouseUpNext.bind(this);
        this.loadWtfs = this.loadWtfs.bind(this);
        this.loadWtfs();
    }

    render() {
        return (
            <div class="main">
                <p id="count">Count:{this.state.count}</p>
                <button type="image" src="./wtf.jpg" onMouseDown={this._mouseDownNext}
                        className="button-wtf"
                       onMouseUp={this._mouseUpNext}/>
                <button type="image" src="./wtf.jpg" onMouseDown={this._mouseDownPrev}
                        className="button-next"
                        onMouseUp={this._mouseUpPrev}/>
            </div>
        )
    }

    _mouseDownPrev(e) {
        console.log("_mouseDownPrev")
        e.preventDefault();
        this.setState({pressed: true});
    }

    _mouseUpPrev() {
        this.setState({pressed: false});
    }

    _mouseDownNext(e) {
        console.log("_mouseDownNext");
        this.props.mouseDownNext();
    }

    _mouseUpNext() {
        console.log("_mouseDownNext");
        this.props.mouseUpNext();
    }

    loadWtfs () {
        let self = this;
        setInterval(function () {
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