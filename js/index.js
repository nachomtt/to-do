
  /*let hola = [{
        id: 1,
        text: "hola"
    },
    {
        id: 2,
        text: "chau"
    }]
    localStorage.setItem("todoList",JSON.stringify(hola))*/

  function addElement() {
    $(".addItem").click(() => {
      if (!$("[name=todoInput]").val() == "") {
        const addValue = $("[name=todoInput]").val();
        createFromLocal(addValue);
      } else return;
    });
  }
  function createElements(array) {
    array.forEach((item) => {
      const templateElement = $("#template-todo-element").contents();
      const clone = templateElement.clone();
      clone.find("[name=todoElementText]").val(item.text);
      clone.find("p").text(item.text);
      clone.find(".todoElementEdit").attr("data-id", item.id);
      clone.find(".todoElementRemove").attr("data-id", item.id);
      $(".list").append(clone);
      // const fragment = document.createDocumentFragment();
      // fragment.append(clone)
      // $(".list").append(fragment)
    });
  }
  function createFromLocal(newElement) {
    if (localStorage.getItem("todoList") !== null) {
      let newList = [];
      if (newElement) {
        let localBefore = [];
        let newId = 0;
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem("todoList")).length;
          i++
        ) {
          localBefore.push(JSON.parse(localStorage.getItem("todoList"))[i]);
          newId = JSON.parse(localStorage.getItem("todoList"))[i].id + 1;
        }

        newList.push({ id: newId, text: newElement });
        createElements(newList);
        localBefore.push(newList[0]);
        localStorage.setItem("todoList", JSON.stringify(localBefore));
      } else {
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem("todoList")).length;
          i++
        ) {
          newList.push(JSON.parse(localStorage.getItem("todoList"))[i]);
        }
        createElements(newList);
      }
    } else if (newElement) {
      let newList = [];
      newList.push({ id: 1, text: newElement });
      localStorage.setItem("todoList", JSON.stringify(newList));
      createElements(newList);
    }
    editAndRemove();
  }
  function editAndRemove() {
    $(".todoElementRemove").click((event) => {
      const trg = $(event.currentTarget);
      // const eventId = event.attr("data-id");
      const id = trg.data("id");
      trg.parents(".todoElement").remove();
      let lStorage = [];
      for (
        let i = 0;
        i < JSON.parse(localStorage.getItem("todoList")).length;
        i++
      ) {
        if (JSON.parse(localStorage.getItem("todoList"))[i].id != id) {
          lStorage.push(JSON.parse(localStorage.getItem("todoList"))[i]);
        }
      }
      localStorage.setItem("todoList", JSON.stringify(lStorage));
    });
    $(".todoElementEdit").click((event) => {
      const trg = $(event.currentTarget);
      const id = trg.data("id");
      const parent = trg.parents(".todoElement");
      const text = $(parent.find(".todoElementRight").find("p"));
      const input = $(parent.find(".todoElementRight").find("input"));

      function enterEdit() {
        input.removeClass("displayNone");
        text.addClass("displayNone");
        catchEditInput();
        input.focus();
      }

      function catchEditInput() {
        input.bind("input", function () {
          text.text(input.val());
          let localBefore = [];
          for (
            let i = 0;
            i < JSON.parse(localStorage.getItem("todoList")).length;
            i++
          ) {
            if (JSON.parse(localStorage.getItem("todoList"))[i].id == id) {
              localBefore.push({
                id: JSON.parse(localStorage.getItem("todoList"))[i].id,
                text: input.val(),
              });
            } else
              localBefore.push(JSON.parse(localStorage.getItem("todoList"))[i]);
          }
          localStorage.setItem("todoList", JSON.stringify(localBefore));

        });
        function focusCheck() {
            if (!$(input).is(":focus")) {
              const editingFocus = $(".list").find("input:not([displayNone])");
              editingFocus.addClass("displayNone");
              editingFocus.parent().find("p").removeClass("displayNone");
              return clearInterval(interval)
            }
          };
          var interval = null;
          interval = setInterval(focusCheck, 500);
      }
      const editing = $(".list").find("input:not([displayNone])");
      editing.addClass("displayNone");
      editing.parent().find("p").removeClass("displayNone");

      enterEdit();

      return;
    });
  }
  createFromLocal();
  $("[name=todoInput]").val("")
  addElement();
