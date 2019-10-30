let bookStore = new Vue({
  el: "#app",
  data: {
    loading: null,

    search: "",

    booking: []
  },
  methods: {
    getData() {
      console.log("getData method");
      this.loading = true;
      fetch("https://api.myjson.com/bins/zyv02", {
        method: "GET"
      })
        .then(resp => {
          console.log(resp);
          this.loading = false;
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })

        .then(data => {
          console.log(data);
          this.booking = data.books;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    filteredBooking() {
      return this.booking.filter(book => {
        return book.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  created() {
    console.log("created");

    this.getData();
  },
  mounted() {
    console.log("mounted");
  }
});
