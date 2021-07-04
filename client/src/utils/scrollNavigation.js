export const scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
        document.getElementById("topnav").classList.add("nav-sticky");
    } else {
        document.getElementById("topnav").classList.remove("nav-sticky");
    }
};