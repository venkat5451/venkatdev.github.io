import { Component, OnInit } from '@angular/core';
import { UsemeService } from '../useme.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
questions=[];
answer=false;
num=0;//always array retruns o only
points=0;
  constructor(private api:UsemeService) { }

  ngOnInit(): void {
    this.start();
  }
  checkAnswer(correct_answer:String,ur_answer:String){
    this.answer = correct_answer == ur_answer ? true : false;
    this.answer ? this.points += 10 : this.points -=5;
    this.num < this.questions.length ? this.num +=1 : null;
  }
  start(){
this.questions=[];
this.api.getQuiz().subscribe(async res=>{
  
  
let quiz=res['results'];
quiz.forEach(element => {
  element.incorrect_answers.push(element.correct_answer);
  element.incorrect_answers.sort(()=>.5 -Math.random());
  console.log(quiz);
});
this.questions=await quiz;
this.num=0;
this.points=0;
})
  }

}
