const wrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");

const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};


menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");
const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

//lets add category and task with js
let categories = [
    {
        title: "Personal",
        img: "girly.webp"
    },
    {
        title: "Work",
        img: "bag.jpg"
    },
    {
        title: "Fitness",
        img: "yoga.png"
    },
    {
        title: "Health",
        img: "health.png"
    },
    {
    title: "Education",
        img: "education.jpg"
    },
    {
    title: "Finance",
        img: "finance.jpg"
    },
    {
        title: "Coding",
        img: "coding.avif"
    },
];

let tasks = [
    {
        id: 1,
        task: "Buy groceries",
        completed: false,
        category: "Personal"
    },
    {
        id: 2,
        task: "Finish project report",
        completed: false,
        category: "Work"
    },
    {
        id: 8,
        task: "write a new book",
        completed: false,
        category: "Personal"
    },
    {
        id: 3,
        task: "Morning run",
        completed: false,
        category: "Fitness"
    },
    {
        id: 4,
        task: "read a chapter of a book",
        completed: false,
        category: "Personal"
    },
    {
        id: 5,
        task: "prepare presentation for meeting",
        completed: false,
        category: "Work"
    },
    {
        id: 6,
        task: "Learn a new language online",
        completed: false,
        category: "Education"
    },
    {
        id: 7,
        task: "Review investment portfolio",
        completed: false,
        category: "Finance"
    }

   
        
    ];
    
    let selectedCategory = categories[0];
    const categoriesContainer = document.querySelector(".categories");
    const categoryTitle = document.querySelector(".category-title");
    const totalcategoryTasks = document.querySelector(".category-tasks");
    const categoryImg = document.querySelector("#category-img");
    const totalTasks = document.querySelector(".totalTasks");

    const calculateTotal = () => {
      const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.
          toLowerCase()
        );
      totalcategoryTasks.innerHTML = `${categoryTasks.length}Tasks`;
      totalTasks.innerHTML = tasks.length;
    };


  const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
 //get all the tasks of current category
        const categoryTasks = tasks.filter(
            (task)=>task.category.toLowerCase() === category.title.
            toLowerCase()
        );
       //create a div to render category
      const div = document.createElement("div");
      div.classList.add("category");
      div.addEventListener("click", () => {
         wrapper.classList.add("show-category");
         selectedCategory = category;
         console.log(selectedCategory);
         categoryTitle.innerHTML = category.title;
         categoryImg.src = `${category.img}`;
         calculateTotal();
          
         //rerender tasks when category  change
         renderTasks();
      });
      div.innerHTML = `
         <div class="left">
            <img src="${category.img}" alt="${category.title}"/>
            <div class="content">
                <h1>
                    ${category.title}
                </h1>
                <p>${categoryTasks.length} Tasks</p>
            </div>
           </div>
           <div class="options">
            <div class="toggle-btn">
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                >
                    <path
                    stroke-linecap="round"
                    stroje-linejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010
                    1.5zM12 12.75a.75.75 0 110-1.5.75.75 0
                    010 1.5zM12 18.75a.75.75 0 110-1.5.75.75
                    0 010 1.5z"/>

                   
                </svg>
            </div>
           </div>
     `;


     //append the div tot the categories container
     categoriesContainer.appendChild(div);

   

  });
};
  const tasksContainer = document.querySelector(".tasks");

  const renderTasks = () => {
    tasksContainer.innerHTML = "";
    const categoryTasks = tasks.filter(
        (task) =>
            task.category.toLowerCase() === selectedCategory.title.
            toLowerCase()
        );

        //if no tasks for selected calegory
        if(categoryTasks.length === 0) {
            tasksContainer.innerHTML = `
            <p class="no-task">No tasks for this category</p>
            
            `;
        }else {
            // if there are tasks for selected category render them
            categoryTasks.forEach((task) => {
                const div = document.createElement("div");
                div.classList.add("task-wrapper");
                const label = document.createElement("label");
                label.classList.add("task");
                 label.setAttribute("for", task.id);
                 const checkbox = document.createElement("input");
                 checkbox.type = "checkbox";
                 checkbox.id = task.id;
                  checkbox.checked = task.completed;

                  //add completion functionlity on click checkbox
                  checkbox.addEventListener("change" , ()=> {
                    const index = tasks.findIndex((t) => t.id === task.id);
                    //change the true to false or vice versa

                   tasks[index].completed = !tasks[index].completed;
                   //save in local
                    saveLocal();
                  });

                 div.innerHTML = `
                   <div class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
           </div>
                 `;

                 label.innerHTML = `
                   <span class="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>
                  </span>
                 <p>${task.task}</p>
                 `;
                   label.prepend(checkbox);
                   div.prepend(label);
                    tasksContainer.appendChild(div);
                    //delete functionality

                    const deleteBtn = div.querySelector(".delete");
                    deleteBtn.addEventListener("click", () => {
                        const index = tasks.findIndex((t) => t.id === task.id);

                        //remove the clicked tasks
                        tasks.splice(index, 1);
                        saveLocal();
                        renderTasks();

                    });







            });
                    renderCategories();
                    calculateTotal();

              

        }
       



  };

   // save and get tasks from local storage
   const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
   };
   const getLocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"))

    //if tasks found 
    if(localTasks){
        tasks = localTasks;
    }
   };


   //lets add functionality to add new tasks

   //render all the categories in select
   const categorySelect = document.querySelector("#category-select");
   const cancelBtn = document.querySelector(".cancel-btn");
   const addBtn = document.querySelector(".add-btn");

   const taskInput =  document.querySelector("#task-input");
   


   cancelBtn.addEventListener("click", toggleAddTaskForm);

   addBtn.addEventListener("click", () => {
      const task = taskInput.value;
      const category = categorySelect.value;

      if(task === ""){
         alert("please enter a task");
      }else {
         
            const newTask = {
                id : tasks.length + 1,
                task,
                category,
                complted:false, 
            };
             tasks.push(newTask);
             taskInput.value = "";
             saveLocal();
             toggleAddTaskForm();
             renderTasks();
             


            
          }
      
   });
   categories.forEach((category) => {
     const option = document.createElement("option");
     option.value = category.title.toLowerCase();
     option.textContent = category.title;
     categorySelect.appendChild(option);

   });

   


   //these all are already stored tasks
  getLocal();

  calculateTotal();
 
  renderTasks();
