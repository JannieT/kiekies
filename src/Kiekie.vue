<template>
	<img class="skuifie" :class="{ blurred: isBlurred }" :src="source"/>
</template>

<script>
    export default {
        props: ['seed'],

        data() {
            return {
                photo: { title: 'hang on...'},
                isBlurred: true,
                source: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
                thumbImage: new Image(),
        		fullImage: new Image()
        	}
        },

        created() {
            this.setPhoto();

        },

// created, beforeMount, mounted
        
	    methods: {
            setPhoto() {
                if (!this.seed.hasOwnProperty('url_m')) { return }
                this.photo = JSON.parse(JSON.stringify(this.seed));
                this.thumbImage.onload = this.replaceThumb;
                this.thumbImage.src = this.photo.url_t;
                this.fullImage.onload = this.replaceFull;
                this.fullImage.src = this.photo.url_m;
                setTimeout(() => {
                   // todo: simulate slow load
                }, 2000);

            },

            replaceThumb() {
                this.source = this.photo.url_t;
                this.$emit('thumbloaded');
            },

            replaceFull() {
                this.source = this.photo.url_m;
                this.isBlurred = false;
	        }
	    }
    }
</script>