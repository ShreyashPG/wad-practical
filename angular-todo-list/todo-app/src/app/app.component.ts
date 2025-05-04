// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'todo-app';
// }


// app.component.ts
import { Component } from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { CommonModule }    from '@angular/common';

interface Task {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ CommonModule, FormsModule ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  newTask: string = '';
  editingTask: Task | null = null;

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: Date.now(),
        name: this.newTask
      });
      this.newTask = '';
    }
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
    this.newTask = task.name;
  }

  updateTask() {
    if (this.editingTask && this.newTask.trim()) {
      this.tasks = this.tasks.map(task => 
        task.id === this.editingTask!.id ? { ...task, name: this.newTask } : task
      );
      this.cancelEdit();
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  cancelEdit() {
    this.editingTask = null;
    this.newTask = '';
  }
}