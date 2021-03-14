module.exports = (req, res) => {
    res.render("common/404", {
        title: "404 Page not found",
    });
};