const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

const {
  userValidator,
  userIdValidator,
  avatarValidator,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:userId', userIdValidator, getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', userValidator, updateUser);
router.patch('/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
