/*
fetchJSON('./res/data.json').then(data => {
    console.log(data); // Now you can use the fetched data here
});

async function fetchJSON(filePath) {
    try {
        const response = await fetch(filePath);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}
    */
const { createApp } = Vue;
createApp({
  data() {
    return {
      person: {
        firstName: "",
        lastName: "",
        position: "",
        email: "",
        telno: "",
        location: { name: "", link: "" },
        linkedin: "",
        language: [{ name: "", percentage: 0 }],
        summary: "",
      },
      skill: {
        sectionName: "",
        skillSet: [""],
      },
      history: [
        {
          jobTitle: "",
          companyName: "",
          dateFrom: "",
          dateTo: "",
          description: [""],
        },
      ],
      awards: [{ title: "", date: "" }],
      education: [
        {
          college: "",
          courseName: "",
          dateFrom: "",
          dateTo: "",
          items: [{ name: "", description: "" }],
        },
      ],
      curricular: [{ title: "", date: "" }],
      reference: [{ name: "", position: "", telno: "", email: "" }],
    };
  },
  mounted() {
    this.loadJSONData("res/data.json");
  },
  computed: {},
  methods: {
    loadJSONData(d1) {
      fetch(d1)
        .then((response) => response.json())
        .then((data) => {
          this.person = data.person;
          this.skill = data.skill;
          this.history = data.history;
          this.awards = data.awards;
          this.education = data.education;
          this.curricular = data.curricular;
          this.reference = data.reference;
        })
        .catch((error) => {
          console.error("Error loading JSON: ", error);
        });
    },
    printPage() {
      window.print();
    },
  },
}).mount("#app");
