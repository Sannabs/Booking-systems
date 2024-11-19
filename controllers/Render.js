module.exports.search = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json([]);
    }
    try {
        const neighborhoods = await Neighborhood.find({
            $or: [
                { location: { $regex: query, $options: 'i' } },
                { title: { $regex: query, $options: 'i' } }
            ]
        }).select('_id title location').limit(10);
        res.json(neighborhoods);
    } catch (e) {
        res.status(500).send('SERVER ERROR');
        console.error(e)
    }
}
