import React, { Component } from "react"

export default class AboutUs extends Component {
  /*
  constructor(props) {
    super(props)
  }
  */

  render() {
    return (
      <div className={"container scene-element " + this.props.animation}>
        <div className={"col s12 card-panel"} style={{ backgroundColor: "white" }}>

          {/* Header */}
          <h4>{"ჩვენს შესახებ"}</h4>

          {/* Content */}
          <p className={"flow-text"}>
            Slami არის ინოვაციური პროდუქტი, რომლის შექმნის იდეა 2017 წელს მედია ჰაკათონზე გაჩნდა.
            ეს არის პლათფორმა რომელიც საშუალებას გაძლევთ რამდენიმე წამში ფოტოებისა და ტექსტის შერწყმით
            დააგენერიროთ ვიდეო.
            <br />
            <br />
            სლამის პლათფორმაზე შექმნილი ვიდეო მომხმარებელს შეუძლია ატვირთოს და გააზიაროს ნებისმიერ
            სოციალურ ქსელში.
            <br />
            <br />
            ვიდეო, რომლის შემქნაც ჩვენს პლათფორმაზე არის შესაძლებელი, სოციალური მედიის მოხმარებლებს
            საშუალებას აძლევს მიიღონ ინფორმაცია სწრაფად  ვიდეოს ფორმატში, რომელზეც გამოსახულია ტექსტები
            სათაურების სახით.
          </p>
        </div>
      </div>
    )
  }
}