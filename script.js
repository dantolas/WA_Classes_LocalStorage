class Imagus{

    author;
    name;
    price;
    year;

    constructor(author,name,price,year) {
        this.author = author;
        this.name = name;
        this.price = price;
        this.year = year;
    }

    toString(){

        return this.author + " " + this.name + " " + " " + this.price + " " +this.year;
    }

    
}

class Gallery{
    images = [];

    getTotalPrice(){
        let totalprice = 0;
        this.images.forEach(element => {
            totalprice += element.price;
        });
        return totalprice;
    }

    getTopThree(){
        let rImages = this.images;
        rImages.sort(function(a, b){return b.price - a.price})
        const span = document.querySelector("#result");
                span.innerHTML = "";

        for(let i=0;i<3;i++){
            console.log(rImages[i].author + "," + rImages[i].name + "," + rImages[i].price);
            span.innerHTML += rImages[i].author + "," + rImages[i].name + "," + rImages[i].price+" ";
        }
    }

    getByAuthor(author){
        let rImages = [];
        this.images.forEach(element => {
            if(element.author == author) rImages.push(element);
        });

        const span = document.querySelector("#result");
                

        rImages.sort(function(a, b){return b.price - a.price})
        rImages.forEach(element => {
            console.log(element.name+", "+element.price);
            span.innerHTML += element.name+", "+element.price+" ";
        });
    }

    byAuthors(){
        let authors = [];
        this.images.forEach(x=>{if(!authors.includes(x.author)) authors.push(x.author)})

        const span = document.querySelector("#result");
                span.innerHTML = "";

        authors.forEach(author =>{
                    console.log(author+"{");
                    span.innerHTML += author+"{";
                    this.getByAuthor(author);
                    span.innerHTML += "}";
                    console.log("}");
    
                });

                
    }

    printGallery(document){
        const span = document.querySelector("#result");
        span.innerHTML = "";
        this.images.forEach(image => span.innerHTML += "|"+image.toString()+"|");
    }

    


}

const gall = new Gallery();
gall.images.push(new Imagus("Monkey","Banan",500,1955));
gall.images.push(new Imagus("Monkey","Ape",600,1955));
gall.images.push(new Imagus("Monkey","Poopfling",200,1955));
gall.images.push(new Imagus("Gorilla","Protein",500,1955));
gall.images.push(new Imagus("Gorilla","Bench",600,1955));
gall.images.push(new Imagus("Orangutan","Wisdom",200,1955));

gall.images.forEach(image => localStorage.setItem(image.author +" "+image.name,image));



const showButton = document.querySelector("#showButton");
showButton.addEventListener('click',function(){gall.printGallery(document)})

const byAuthorButton = document.querySelector("#byAuthorButton");
byAuthorButton.addEventListener('click',function(){
    const formData = new FormData(document.forms.namedItem("fileinfo"));
    author = formData.get("author");
    console.log(author);
    const span = document.querySelector("#result");
    span.innerHTML = "";
    gall.getByAuthor(author)})
const byAuthorsButton = document.querySelector("#byAuthorsButton");
byAuthorsButton.addEventListener('click',function(){gall.byAuthors()})

const priceButton =  document.querySelector("#priceButton");
priceButton.addEventListener('click',function(){document.querySelector("#result").innerHTML = gall.getTotalPrice()})

const topThreeButton = document.querySelector("#topThreeButton");
topThreeButton.addEventListener('click',function(){gall.getTopThree()})




const form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formValues = [];
  for (const value of formData.values()) {
    console.log(value);
    formValues.push(value);
  }

    im = new Imagus(formValues[0],formValues[1],formValues[2],formValues[3]);
  gall.images.push(im) 
  localStorage.setItem(im.author+" "+im.name,im)
  
});