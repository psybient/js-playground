import {
  $on,
  qs,
  qi,
  qsa,
  createFragment
} from '../common/utils';

// import {sideBarUi} from './parts/sidebar';sideBarUi();
import SlideItems from './owlCarouselTemplate';
import GalleryTemplate from './galleryTemplate';

export class UIController {
  constructor() {

    this.currentPage;
    this.defalts = {
      sections: ['home-page', 'gallery-page', 'contact-page', 'about-page'],
      rootElement: "root",
      loaded: false
    };
    this.root = qi(this.defalts.rootElement);
    this.activeSection = _.last(window.location.href.split('/'));
    console.log(this.activeSection);
  }

  drowContext() {
    var sectionHtml;
    if (this.activeSection !== "")
      if (!_.startsWith(this.acticveSection, '#') && this.activeSection === "index.html") {
        sectionHtml = this.getRenderedSection()

        const sliderConteiner = qs('.hero-slider');
        sliderConteiner.innerHTML = sectionHtml;
        //this.setSiTextHeight();
      }
     if(this.activeSection.toLowerCase() === "gallery.html"){
      sectionHtml = this.getRenderedGallery();
      const sliderConteiner = qs('.page-section');
      sliderConteiner.innerHTML = sectionHtml;
    }
    else{
      sectionHtml = this.getRenderedSection()

      const sliderConteiner = qs('.hero-slider');
      sliderConteiner.innerHTML = sectionHtml;
    }
  }


  getRenderedSection() {
    //renders root entry
    //   const sectionTemplate = `<div id="sectionDiv" class="page-section ${section}>

    //   </div>`;

    //   //  this.root.appendChild( createFragment(sectionTemplate));
    //   //this.root.innerHTML = sectionTemplate;
    //  // var rootDivTmpl = createFragment(sectionTemplate);
    //   this.root.innerHTML = sectionTemplate;
    //   //const sectionDiv = sectionDiv');
    //   const sectionDiv = document.getElementById('root');//.content.cloneNode(true);
    //   sectionDiv.innerHTML = section === 'home-page' ? carouselTemplate : galleryTemplate;


    const slideItems = new SlideItems('public/images/slide', 'slider-bg-');
    return slideItems.getRenderedHtml();


  }

  getRenderedGallery() {
    // renders gallery
    const galleryConteiner = qs('.portfolio-gallery');
    const galleryTemplate = new GalleryTemplate(galleryConteiner, 'public/images/gallery');
    return galleryTemplate.render();
  }
  setSiTextHeight() {
    // $('.js-height').height=()
    const blogSection = $(".js-height");
    //console.log(blogSection);
    let currentHeight = window.screen.height;
    //alert(currentHeight);
    for (let item of blogSection) {

      // $(item).closest('p').css({'height':'100px;'});
      // console.log(item);
      $(item).niceScroll({
        cursorborder: "",
        cursorcolor: "#323232",
        boxzoom: false,
        cursorwidth: 3,
        autohidemode: false,
        background: '#b9c9da',
        cursorborderradius: 0,
        railoffset: {
          top: 50,
          right: 0,
          left: 0,
          bottom: 0
        },
        railpadding: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 100
        },

      });
    }
    $(".js-height")
  }
}



const carouselTemplate = `<div class="hero-slider owl-carousel jsSlideContent">

</div>
<div id="snh-1"></div>`;

const galleryTemplate = `      <div class="portfolio-gallery">
       
</div>`;
//import svgs from '../../template/svgs';
//import TemplateLoader from '../scripts/uiHelpers/templateLoader';

// (async()=>{
//  console.log(this);
// })();
//const tmpLoader = new TemplateLoader((qi('lazySvgs'),svgs));
