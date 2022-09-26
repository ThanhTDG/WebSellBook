const controller = (obj) => {
  const getAll = async function (req, res) {
    try {
      const data = await obj.find();
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const get = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await obj.findById(id);

      if (data !== null) {
        res.json(data);
      } else {
        res.status(404).send(`Document with {_id: '${id}'} not found`);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const create = async (req, res) => {
    const body = req.body;
    const data = new obj(body);

    try {
      const newData = await data.save();
      res.status(201).json(newData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const options = { new: true };
      const data = await obj.findByIdAndUpdate(id, body, options);

      if (data !== null) {
        res.send(data);
      } else {
        res.status(404).send(`Document with {_id: '${id}'} not found`);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await obj.findByIdAndDelete(id);

      if (data !== null) {
        res
          .status(204)
          .send(`Document with {_id: '${id}'} has been deleted...`);
      } else {
        res.status(404).send(`Document with {_id: '${id}'} not found`);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  return {
    getAll,
    get,
    create,
    update,
    remove,
  };
};

module.exports = controller;
