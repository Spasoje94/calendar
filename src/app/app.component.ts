import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  days: (number | string)[] = [];

  currDate: string;
  currDayInWeek: number;
  currDay: string | number;
  currMonth: number;
  currYear: number;
  daysInMonth: number;

  currentMonthActive: boolean = false;

  trenutnoVreme = new Date();

  constructor() {
    this.currDate = new Date().toString();
    // console.log('currDate', this.currDate);

    this.currDayInWeek = new Date().getDay();
    // console.log('currDayInWeek', this.currDayInWeek);

    this.currDay = new Date().getDate();
    // console.log('currDay', this.currDay);

    this.currMonth = new Date().getMonth();
    // console.log('currMonth', this.currMonth);

    this.currYear = new Date().getFullYear();
    // console.log('currYear', this.currYear);

    this.daysInMonth = this.calculateDaysInMonth(
      this.currYear,
      this.currMonth + 1
    );
    // console.log('dani u mesecu', this.daysInMonth);

    this.calculateDays();

    // this.trenutnoVreme = new Date();
    setInterval(() => {
      this.trenutnoVreme = new Date();
    }, 1000);
  }
  calculateDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 0);
    // console.log('date', date);
    // console.log('calc days', month, year, new Date(year, month, 0).getDate());
    return date.getDate();
  }

  calculateDays() {
    let firstDay = new Date(this.currYear, this.currMonth, 1).getDay();
    // console.log('firstDayInMonth', firstDay);

    for (let i = -firstDay; i < this.daysInMonth; i++) {
      this.days.push(new Date(this.currYear, this.currMonth, i + 1).getDate());
    }
    if (
      this.trenutnoVreme.getFullYear() === this.currYear &&
      this.currMonth === this.trenutnoVreme.getMonth()
    ) {
      this.currentMonthActive = true;
    } else {
      this.currentMonthActive = false;
    }
    // console.log('calculateDays', this.days);
  }

  setToCurrDay() {
    this.currYear = new Date().getFullYear();
    this.currMonth = new Date().getMonth();
    this.daysInMonth = this.calculateDaysInMonth(
      this.currYear,
      this.currMonth + 1
    );
    this.days = [];
    this.calculateDays();
  }

  nextMonth() {
    if (this.currMonth === 11) {
      this.currMonth = 0;
      this.currYear++;
    } else {
      this.currMonth++;
    }
    this.daysInMonth = this.calculateDaysInMonth(
      this.currYear,
      this.currMonth + 1
    );
    this.days = [];
    this.calculateDays();
  }

  previousMonth() {
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear--;
    } else {
      this.currMonth--;
    }
    this.daysInMonth = this.calculateDaysInMonth(
      this.currYear,
      this.currMonth + 1
    );
    this.days = [];
    this.calculateDays();
  }

  nextYear() {
    this.currYear++;
    this.daysInMonth = this.calculateDaysInMonth(
      this.currYear,
      this.currMonth + 1
    );
    this.days = [];
    this.calculateDays();
  }

  previousYear() {
    this.currYear--;
    this.daysInMonth = this.calculateDaysInMonth(
      this.currYear,
      this.currMonth + 1
    );
    this.days = [];
    this.calculateDays();
  }
}
