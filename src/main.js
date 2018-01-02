import Vue from 'vue'
// import VueLoop from 'vue-loop'
import Flickity from 'flickity'
import Kiekie from './Kiekie.vue'
import axios from 'axios'

new Vue({
    el: '#app',

    data() {
    	return {
            slideCount: 10,

            isLoaded: false,

            landedCount: 0,

    		photos: [],

            flickity: {},

            // see: http://flickity.metafizzy.co/options.html
            flickityOptions: {
                // prevNextButtons: true,
                // setGallerySize: false,
                // lazyLoad: false,
                // adaptiveHeight: true,
                // pageDots: false,                
                imagesLoaded: true,
                wrapAround: true
            },

    	}
    },

    components: {
        Kiekie
    },


    mounted() {
        console.log('polling');
        this.fetchPhotos();

    },

    methods: {

        fetchPhotos() {
            this.isLoaded = false;
            var flikr = {
                method: "flickr.people.getPublicPhotos",
                api_key: env.API_KEY,
                user_id: env.USER_ID,
                format: "json",
                per_page: this.slideCount,
                extras: "date_taken,url_t,url_m,url_z,media",
                page: 1,
                nojsoncallback: 1
            };
            var query = Object.keys(flikr).map(k => k + '=' + encodeURIComponent(flikr[k])).join('&');
            axios.get('https://api.flickr.com/services/rest/?' + query)
            .then(response => {
                // this.flickity.destroy();
                this.photos = response.data.photos.photo.filter((item) => { return item.media === 'photo';});
                console.log(this.photos);
                this.isLoaded = true;
            })
            .catch(error => {
                console.log(error);
            });         
        },

        landed() {
            this.landedCount++;
            console.log(this.landedCount);
            if (this.landedCount == this.photos.length) {
                this.setFlickity();
            }
        },

        setFlickity() {
            this.flickity = new Flickity('.carousel', this.flickityOptions);
            // setTimeout(() => {
            //     this.flickity.reloadCells();
            // }, 500);
        },

    	// mockPhotos() {
    	// 	this.photos = JSON.parse('[{"id":"33532451836","owner":"7732482@N04","secret":"1fd2ba08f0","server":"2810","farm":3,"title":"IMG_7974","ispublic":1,"isfriend":0,"isfamily":0,"datetaken":"2017-03-20 18:28:33","datetakengranularity":"0","datetakenunknown":"0","media":"photo","media_status":"ready","url_t":"https:\/\/farm3.staticflickr.com\/2810\/33532451836_1fd2ba08f0_t.jpg","height_t":"75","width_t":"100","url_m":"https:\/\/farm3.staticflickr.com\/2810\/33532451836_1fd2ba08f0.jpg","height_m":"375","width_m":"500","url_z":"https:\/\/farm3.staticflickr.com\/2810\/33532451836_1fd2ba08f0_z.jpg","height_z":"480","width_z":"640"},{"id":"33532452496","owner":"7732482@N04","secret":"98c656ec81","server":"2844","farm":3,"title":"IMG_7970","ispublic":1,"isfriend":0,"isfamily":0,"datetaken":"2017-03-20 17:43:58","datetakengranularity":"0","datetakenunknown":"0","media":"photo","media_status":"ready","url_t":"https:\/\/farm3.staticflickr.com\/2844\/33532452496_98c656ec81_t.jpg","height_t":"75","width_t":"100","url_m":"https:\/\/farm3.staticflickr.com\/2844\/33532452496_98c656ec81.jpg","height_m":"375","width_m":"500","url_z":"https:\/\/farm3.staticflickr.com\/2844\/33532452496_98c656ec81_z.jpg","height_z":"480","width_z":"640"},{"id":"33416404352","owner":"7732482@N04","secret":"53a04e0a60","server":"3724","farm":4,"title":"IMG_7969","ispublic":1,"isfriend":0,"isfamily":0,"datetaken":"2017-03-20 16:16:30","datetakengranularity":"0","datetakenunknown":"0","media":"photo","media_status":"ready","url_t":"https:\/\/farm4.staticflickr.com\/3724\/33416404352_53a04e0a60_t.jpg","height_t":"75","width_t":"100","url_m":"https:\/\/farm4.staticflickr.com\/3724\/33416404352_53a04e0a60.jpg","height_m":"375","width_m":"500","url_z":"https:\/\/farm4.staticflickr.com\/3724\/33416404352_53a04e0a60_z.jpg","height_z":"480","width_z":"640"},{"id":"33444148671","owner":"7732482@N04","secret":"08d5f783a0","server":"3946","farm":4,"title":"IMG_7968","ispublic":1,"isfriend":0,"isfamily":0,"datetaken":"2017-03-20 15:57:29","datetakengranularity":"0","datetakenunknown":"0","media":"photo","media_status":"ready","url_t":"https:\/\/farm4.staticflickr.com\/3946\/33444148671_08d5f783a0_t.jpg","height_t":"75","width_t":"100","url_m":"https:\/\/farm4.staticflickr.com\/3946\/33444148671_08d5f783a0.jpg","height_m":"375","width_m":"500","url_z":"https:\/\/farm4.staticflickr.com\/3946\/33444148671_08d5f783a0_z.jpg","height_z":"480","width_z":"640"},{"id":"33444152031","owner":"7732482@N04","secret":"0170d342bd","server":"2822","farm":3,"title":"IMG_7966","ispublic":1,"isfriend":0,"isfamily":0,"datetaken":"2017-03-20 15:53:09","datetakengranularity":"0","datetakenunknown":"0","media":"photo","media_status":"ready","url_t":"https:\/\/farm3.staticflickr.com\/2822\/33444152031_0170d342bd_t.jpg","height_t":"75","width_t":"100","url_m":"https:\/\/farm3.staticflickr.com\/2822\/33444152031_0170d342bd.jpg","height_m":"375","width_m":"500","url_z":"https:\/\/farm3.staticflickr.com\/2822\/33444152031_0170d342bd_z.jpg","height_z":"480","width_z":"640"},{"id":"33573282835","owner":"7732482@N04","secret":"3457cc81a8","server":"3928","farm":4,"title":"IMG_7961","ispublic":1,"isfriend":0,"isfamily":0,"datetaken":"2017-03-20 15:23:48","datetakengranularity":"0","datetakenunknown":"0","media":"photo","media_status":"ready","url_t":"https:\/\/farm4.staticflickr.com\/3928\/33573282835_3457cc81a8_t.jpg","height_t":"75","width_t":"100","url_m":"https:\/\/farm4.staticflickr.com\/3928\/33573282835_3457cc81a8.jpg","height_m":"375","width_m":"500","url_z":"https:\/\/farm4.staticflickr.com\/3928\/33573282835_3457cc81a8_z.jpg","height_z":"480","width_z":"640"}]');
    	// },
    }
})
