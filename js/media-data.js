/*
 * NSDRA MEDIA PAGE - CONTENT FILE
 * =============================================================================
 * The Media page shows BLOCKS of cards. Each block = a heading + a grid of cards
 * (4 cards per row).
 *
 * TO HIDE A WHOLE BLOCK: select the block (from its opening  {  to its closing  },)
 * and comment it out (Ctrl + /  in most editors), or simply delete it.
 * Nothing is left behind on the page - no heading, no empty space.
 *
 * EACH CARD
 *   - shows one cover picture, a short title and up to 3 tags
 *   - has 2 or more media  -> it behaves like a FOLDER: clicking opens a viewer
 *                             where you slide through its photos / videos
 *   - has exactly 1 media  -> clicking shows that photo / video / PDF directly
 *   - always shows the card's info and a Download button in the viewer
 *   Individual photos are only reachable through their card.
 *
 * CARD FIELDS (fill only what you have; empty ones are not shown)
 *   title          short title on the card            'Faisalabad'
 *   label          small line above the title         'Seminar', 'Field Visit'
 *   tags           ['Faisalabad', 'Seminar']          (first 3 show on the card;
 *                  every tag you use also becomes a filter button under search)
 *   cover          cover picture; leave out to use the first photo automatically
 *   city, venue, date ('2026-03-12' or text), organization,
 *   conferenceName, topic, participants ['Name', ...], description
 *   media          list of files (below)
 *
 * MEDIA FIELDS
 *   src            file path (required)
 *   type           'image' (default) | 'video' | 'document' (PDF)
 *   poster         preview picture for a video
 *   duration       '2:14'
 *   title          caption for that one file (optional)
 *
 * TO ADD A CARD:  copy a whole  { ... },  card and paste it in the list.
 * TO ADD A BLOCK: copy a whole  { title: ..., items: [ ... ] },  block.
 *
 * Each city that had more than one kind of activity (e.g. an indoor seminar
 * AND a field visit) is split into separate cards - one card per activity -
 * so photos and videos of different activities never mix inside one folder.
 * =============================================================================
 */
window.NSDRA_MEDIA = {
  sections: [

    // ==================== COTTON TRAVELLING SEMINAR 2026 ====================
    {
      collection: true,          // frames this block as one collection: bordered panel + totals
      eyebrow: 'Travelling Seminar',
      title: 'Cotton Travelling Seminar 2026',
      description: 'Photographs and videos from each stop of the seminar (15\u201321 September 2026). Open a card to browse its media.',
      items: [
        {
          title: 'Faisalabad',
          label: 'Seminar',
          tags: ['Faisalabad', 'Seminar'],
          city: 'Faisalabad',
          date: '2026-09-15',
          description: 'Opening session of the Cotton Travelling Seminar 2026, followed by a briefing on trial results and presentations.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-05.jpg' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-video-01-poster.jpg', duration: '0:17' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-video-02.mp4', poster: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-video-02-poster.jpg', duration: '0:16' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-video-03.mp4', poster: 'images/media/cotton-travelling-seminar-2026/faisalabad/seminar-video-03-poster.jpg', duration: '0:20' }
          ]
        },
        {
          title: 'Faisalabad',
          label: 'Field Visit',
          tags: ['Faisalabad', 'Field Visit'],
          city: 'Faisalabad',
          date: '2026-09-15',
          description: 'Field visit to the NCVT 2026-27 cotton variety trial layout at Faisalabad.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-06.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-07.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-08.jpg' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-video-01-poster.jpg', duration: '0:02' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-video-02.mp4', poster: 'images/media/cotton-travelling-seminar-2026/faisalabad/field-visit-video-02-poster.jpg', duration: '0:14' }
          ]
        },
        {
          title: 'Khanewal',
          label: 'Field Visit',
          tags: ['Khanewal', 'Field Visit'],
          city: 'Khanewal',
          description: 'Field visit and inspection of the cotton variety trial site at Khanewal.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-06.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-07.jpg' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/khanewal/field-visit-video-01-poster.jpg', duration: '0:29' }
          ]
        },
        {
          title: 'Lodhran',
          label: 'Meeting',
          tags: ['Lodhran', 'Meeting'],
          city: 'Lodhran',
          date: '2026-09-17',
          description: 'Discussion session with growers and officials held at Lodhran.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-06.jpg' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-video-01-poster.jpg', duration: '0:29' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-video-02.mp4', poster: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-video-02-poster.jpg', duration: '0:16' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-video-03.mp4', poster: 'images/media/cotton-travelling-seminar-2026/lodhran/meeting-video-03-poster.jpg', duration: '0:31' }
          ]
        },
        {
          title: 'Lodhran',
          label: 'Field Visit',
          tags: ['Lodhran', 'Field Visit'],
          city: 'Lodhran',
          date: '2026-09-17',
          description: 'Field walk and inspection of cotton trial plots at Lodhran.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-06.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-07.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-08.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-09.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-10.jpg' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/lodhran/field-visit-video-01-poster.jpg', duration: '0:14' }
          ]
        },
        {
          title: 'Sakrand',
          label: 'Meeting',
          tags: ['Sakrand', 'Meeting'],
          city: 'Sakrand',
          venue: 'Central Cotton Research Institute (CCRI), Sakrand',
          description: 'Welcome and discussion session hosted at the Central Cotton Research Institute, Sakrand.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/meeting-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/meeting-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/meeting-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/meeting-04.jpg' }
          ]
        },
        {
          title: 'Sakrand',
          label: 'Field Visit',
          tags: ['Sakrand', 'Field Visit'],
          city: 'Sakrand',
          venue: 'Central Cotton Research Institute (CCRI), Sakrand',
          description: 'Field visit to the cotton trial plots at CCRI Sakrand.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/field-visit-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/field-visit-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/field-visit-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/field-visit-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/field-visit-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sakrand/field-visit-06.jpg' }
          ]
        },
        {
          title: 'Sakrand',
          label: 'Press Coverage',
          tags: ['Sakrand', 'Press Coverage'],
          city: 'Sakrand',
          description: 'News coverage of the Cotton Travelling Seminar 2026 session at Sakrand.',
          media: [
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/sakrand/press-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/sakrand/press-video-01-poster.jpg', duration: '1:38' }
          ]
        },
        {
          title: 'Sukkur',
          label: 'Meeting',
          tags: ['Sukkur', 'Meeting'],
          city: 'Sukkur',
          description: 'Welcome and reception session held at Sukkur.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/meeting-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/meeting-02.jpg' }
          ]
        },
        {
          title: 'Sukkur',
          label: 'Field Visit',
          tags: ['Sukkur', 'Field Visit'],
          city: 'Sukkur',
          description: 'Field visit and inspection of the cotton variety trial site at Sukkur, including single-plant selection plots.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-06.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-07.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-08.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-09.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-10.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-11.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-12.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-13.jpg' },
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-video-01.mp4', poster: 'images/media/cotton-travelling-seminar-2026/sukkur/field-visit-video-01-poster.jpg', duration: '0:06' }
          ]
        },
        {
          title: 'Tando Jam',
          label: 'Field Visit',
          tags: ['Tando Jam', 'Field Visit'],
          city: 'Tando Jam',
          description: 'Field visit to the cotton trial site at Tando Jam.',
          media: [
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-01.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-02.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-03.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-04.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-05.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-06.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-07.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-08.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-09.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-10.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-11.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-12.jpg' },
            { src: 'images/media/cotton-travelling-seminar-2026/tandojam/field-visit-13.jpg' }
          ]
        },
        {
          title: 'MNSUAM',
          label: 'Delegation Visit',
          tags: ['Multan', 'Delegation Visit', 'MNSUAM'],
          city: 'Multan',
          venue: 'Muhammad Nawaz Sharif University of Agriculture, Multan (MNSUAM)',
          organization: 'Muhammad Nawaz Sharif University of Agriculture, Multan (MNSUAM)',
          description: 'Delegation visit of the Cotton Travelling Seminar 2026 to the Muhammad Nawaz Sharif University of Agriculture, Multan (MNSUAM).',
          media: [
            { type: 'video', src: 'images/media/cotton-travelling-seminar-2026/MNSUAM/NSDRA-CottonTravelling-Seminar-Visit-to-MNSUAM.mp4', poster: 'images/media/cotton-travelling-seminar-2026/MNSUAM/video-cover.png', title: 'Delegation Visit to MNSUAM' }
          ]
        },
      ]
    }

  ]
};
