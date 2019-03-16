const a = new diff();
const id = getUrlVars()["t"];
const css = document.getElementById("element");
const instance = axios.create({
  baseURL: 'https://radix-83cd.restdb.io/rest/tuts',
  timeout: 5000,
  headers: {'x-apikey': '5ae89d7625a622ae4d528762', 'content-type': 'application/json', 'cache-control': 'no-cache'}
});

var project = { 
  name: "",
  steps: [{
    title: "",
    data: ""
  }]
};

var step = 0;

function updateCss() {
  css.innerText = project.steps[step].data;
}

function updateElement() {
  element.innerHTML = project.element;
  editor.setValue(project.element);
}


Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation()
      const handler = binding.value
      if (!el.contains(e.target) && el.init) {
        handler();
        el.init = false;
      } else {
        el.init = true;
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind () {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})

var actions = new Vue({
  el: "#actions",
  data: function() {
    return {
      isEdit: !id,
      isEditElement: !id,
      step: null,
      currentIndex: step,
      project: project,
      editField: null,
      showModal: false
    }
  },
  methods: {
    test: () => {
      this.updateCss();
    },
    updateElement: () => {
      this.updateElement();
    },
    focusField(name){
      this.editField = name;
      this.$nextTick(() => {
        this.$refs[name].focus();
      })
    },
    showField(name){
      return this.editField === name;
    },
    onBlur: () => {
      this.actions.editField = "a";
    },
    saveStep: () => {
      this.actions.showModal = false;
      this.save();
    },
    cancelModal: () => {
      this.actions.showModal = false;
    }
  }
});

var element = document.getElementById("ee");
var elem = document.getElementById("text");

var currentText;

function loadStep() {
  var newText = project.steps[step].data;
  actions.step = project.steps[step];

  // Do not show difference when going back
  if (actions.currentIndex > step) {
    currentText = newText;
  }

  actions.currentIndex = step;

  // if first step
  if (!currentText) {
    currentText = newText;
  }

  var result1 = css_beautify(currentText);
  var result2 = css_beautify(newText);

  var textDiff = a.main(result1, result2);
  elem.innerHTML = a.prettyHtml(textDiff);

  currentText = newText;

  editorCSS.setValue(currentText);

  updateCss();
}

function previous() {
    const isFirstStepLimit = step === 0;
    if (isFirstStepLimit) {
        return;
    }
    step--;
    loadStep();
}

function next() {
    const isLastStepLimit = step === project.steps.length - 1;
    if (isLastStepLimit) {
        return;
    }
    step++;
    loadStep();
}

function edit() {
  actions.isEdit = !actions.isEdit;
}

function editElement() {
  actions.isEditElement = !actions.isEditElement;
}

function save() {
  if (!id) {
    console.log("Creating...");
    instance.post("", project).then(r => {
      location.search = "t=" + r.data._id;
    })
  } else {
    console.log("Saving...");
    instance.put("/" + id, project).then(r => {
      console.log(r);
    })
  }
}

function addStep() {
    var value = prompt('Enter step description');
    project.steps.push({
        title: value,
        data: editorCSS.getValue()
    })
    next();
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function init() {
  if (!id) {
    return;
  }
  instance.get("/" + id).then(r => {

    r.data.steps.forEach(element => {
      element.data = css_beautify(element.data)
    });

    project = r.data;
    actions.project = project;
    updateElement();
    loadStep();
  })
}

init();

var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
  mode: 'htmlmixed',
  theme: 'dracula'
});

editor.on("change", function() {
  project.element = editor.getValue();
  element.innerHTML = project.element;
});


var editorCSS = CodeMirror.fromTextArea(document.getElementById('code_css'), {
  mode: 'css',
  tabSize: 4,
  smartIndent: false,
  theme: 'dracula'
});

editorCSS.on("change", function() {
  if (actions.isEdit) {
    project.steps[step].data = editorCSS.getValue();
    elem.innerHTML = editorCSS.getValue();
    updateCss();
  }
});
