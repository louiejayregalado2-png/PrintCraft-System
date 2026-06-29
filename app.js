const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach(item => {

    item.addEventListener("click", function(){

        menuItems.forEach(i => i.classList.remove("active"));

        this.classList.add("active");

    });

});
