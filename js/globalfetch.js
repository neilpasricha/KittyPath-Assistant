let springClasses, bulletinClasses;

let fetchClassData = () => {
  $.getJSON("https://crossorigin.me/http://aasmaayn.000webhostapp.com/new_bulletin.json", bulletin => {
    bulletinClasses = bulletin;
    $.getJSON("https://crossorigin.me/http://aasmaayn.000webhostapp.com/classesSpring_edit.json", spring => {
      springClasses = spring;
      // reccommendBitches
      // console.log("loaded ya shit");
      getAuditClasses();
      enableClassSearch();
    });
  });
};
