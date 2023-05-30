class PageController {

    showHome(req, res) {
      
        res.render('pages/home', {
        titlePage: 'Strona główna',
        
      })}

     showNotFound(req, res) {
        res.render('errors/404',{
         titlePage: '404',
         layout: 'layouts/minimal',
        })
     }
};

module.exports =new PageController();