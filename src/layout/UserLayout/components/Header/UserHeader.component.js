// import React from 'react';
// import {AppBar, Box, Container, Fab, Toolbar, Typography, useScrollTrigger, Zoom} from '@mui/material';
// import * as PropTypes from 'prop-types';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import styles from './UserHeader.module.scss';
//
//
// ScrollTop.propTypes = {children: PropTypes.node};
//
// function ScrollTop(props) {
//
//     const {children, window} = props;
//     // Note that you normally won't need to set the window ref as useScrollTrigger
//     // will default to window.
//     // This is only being set here because the demo is in an iframe.
//     const trigger = useScrollTrigger({
//         target: window ? window() : undefined,
//         disableHysteresis: true,
//         threshold: 100,
//     });
//
//     const handleClick = (event) => {
//         const anchor = (event.target.ownerDocument || document).querySelector(
//             '#back-to-top-anchor',
//         );
//
//         if (anchor) {
//             anchor.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'center',
//             });
//         }
//     };
//
//     return (
//         <Zoom in={trigger}>
//             <Box
//                 onClick={handleClick}
//                 role="presentation"
//                 sx={{position: 'fixed', bottom: 16, right: 16}}
//             >
//                 {children}
//             </Box>
//         </Zoom>
//     );
// }
//
// function Header(props) {
//     const {img, title, buttonManagement, buttonPurchase} = props;
//     return (
//         <div>
//             <AppBar>
//                 <Toolbar>
//                     <Container sx={{py: 2.5}}>
//                         <div style={{display: 'flex', flexDirection: 'column'}}>
//                             {img && <img src={img} alt={img}/>}
//                             {title && <Typography className={styles.titleFontSize} variant="h1" component="h1"> {title} </Typography>}
//                         </div>
//                     </Container>
//                 </Toolbar>
//             </AppBar>
//             <Toolbar id="back-to-top-anchor"/>
//             <Container>
//                 <Box sx={{my: 2}}>
//                     <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis impedit optio pariatur soluta totam, unde. Exercitationem ipsa libero maiores necessitatibus nisi quasi quos sequi vero! Assumenda dolores dolorum itaque iusto?</span><span>Alias aliquam aperiam asperiores cum cupiditate dolorum est exercitationem expedita explicabo fugit illum in, inventore libero mollitia nostrum, officia optio perferendis porro quam reiciendis repudiandae voluptatibus voluptatum! Consectetur, nihil quia?</span><span>Blanditiis cumque illum laborum praesentium, quidem quis sit soluta totam! Animi dolore eos et expedita incidunt nobis numquam. Ab consequuntur distinctio impedit laudantium magnam, necessitatibus porro quae repellendus veniam vitae.</span><span>Ab aliquid, amet architecto ducimus eaque error esse eveniet facilis fuga fugiat id in ipsum iste itaque laborum, minus modi necessitatibus neque obcaecati odio perferendis porro quisquam recusandae reiciendis similique?</span><span>A alias consectetur debitis dolores ducimus eius fuga illum laudantium molestias natus neque nobis officia officiis pariatur perferendis praesentium quam, quidem quisquam rem repellat rerum sapiente soluta sunt totam voluptatum!</span><span>Dicta perspiciatis, tempora? Alias at aut autem culpa dicta earum, eos eveniet, expedita fuga in incidunt, ipsa iste magni recusandae reiciendis reprehenderit temporibus. Culpa est eveniet itaque maxime odit quisquam.</span><span>Accusantium animi cupiditate deleniti dolor dolorem dolores eos eum laboriosam maiores maxime modi nisi non officiis ratione sequi, tempora temporibus unde veritatis voluptates voluptatum. Eum molestiae provident quia recusandae saepe.</span><span>Alias aperiam at beatae, culpa delectus deleniti ea ipsum itaque labore maiores neque nisi obcaecati odit optio quae quisquam quos ratione suscipit vitae voluptates. Accusamus deleniti facilis nobis quos vero.</span><span>Consectetur consequatur cum debitis, deserunt doloribus enim, explicabo iste nihil numquam perferendis porro provident repellat rerum, tenetur unde ut veniam! Aliquid deserunt dolor dolorum eos ipsa iure rerum, tenetur totam!</span><span>Amet asperiores corporis doloremque exercitationem itaque praesentium recusandae, soluta sunt tenetur unde. Nam sequi, suscipit. Aliquam cupiditate doloremque doloribus dolorum error id inventore ipsum, perferendis placeat soluta vitae voluptas voluptates?</span>
//                     </p>
//                     <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis impedit optio pariatur soluta totam, unde. Exercitationem ipsa libero maiores necessitatibus nisi quasi quos sequi vero! Assumenda dolores dolorum itaque iusto?</span><span>Alias aliquam aperiam asperiores cum cupiditate dolorum est exercitationem expedita explicabo fugit illum in, inventore libero mollitia nostrum, officia optio perferendis porro quam reiciendis repudiandae voluptatibus voluptatum! Consectetur, nihil quia?</span><span>Blanditiis cumque illum laborum praesentium, quidem quis sit soluta totam! Animi dolore eos et expedita incidunt nobis numquam. Ab consequuntur distinctio impedit laudantium magnam, necessitatibus porro quae repellendus veniam vitae.</span><span>Ab aliquid, amet architecto ducimus eaque error esse eveniet facilis fuga fugiat id in ipsum iste itaque laborum, minus modi necessitatibus neque obcaecati odio perferendis porro quisquam recusandae reiciendis similique?</span><span>A alias consectetur debitis dolores ducimus eius fuga illum laudantium molestias natus neque nobis officia officiis pariatur perferendis praesentium quam, quidem quisquam rem repellat rerum sapiente soluta sunt totam voluptatum!</span><span>Dicta perspiciatis, tempora? Alias at aut autem culpa dicta earum, eos eveniet, expedita fuga in incidunt, ipsa iste magni recusandae reiciendis reprehenderit temporibus. Culpa est eveniet itaque maxime odit quisquam.</span><span>Accusantium animi cupiditate deleniti dolor dolorem dolores eos eum laboriosam maiores maxime modi nisi non officiis ratione sequi, tempora temporibus unde veritatis voluptates voluptatum. Eum molestiae provident quia recusandae saepe.</span><span>Alias aperiam at beatae, culpa delectus deleniti ea ipsum itaque labore maiores neque nisi obcaecati odit optio quae quisquam quos ratione suscipit vitae voluptates. Accusamus deleniti facilis nobis quos vero.</span><span>Consectetur consequatur cum debitis, deserunt doloribus enim, explicabo iste nihil numquam perferendis porro provident repellat rerum, tenetur unde ut veniam! Aliquid deserunt dolor dolorum eos ipsa iure rerum, tenetur totam!</span><span>Amet asperiores corporis doloremque exercitationem itaque praesentium recusandae, soluta sunt tenetur unde. Nam sequi, suscipit. Aliquam cupiditate doloremque doloribus dolorum error id inventore ipsum, perferendis placeat soluta vitae voluptas voluptates?</span>
//                     </p>
//                     <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis impedit optio pariatur soluta totam, unde. Exercitationem ipsa libero maiores necessitatibus nisi quasi quos sequi vero! Assumenda dolores dolorum itaque iusto?</span><span>Alias aliquam aperiam asperiores cum cupiditate dolorum est exercitationem expedita explicabo fugit illum in, inventore libero mollitia nostrum, officia optio perferendis porro quam reiciendis repudiandae voluptatibus voluptatum! Consectetur, nihil quia?</span><span>Blanditiis cumque illum laborum praesentium, quidem quis sit soluta totam! Animi dolore eos et expedita incidunt nobis numquam. Ab consequuntur distinctio impedit laudantium magnam, necessitatibus porro quae repellendus veniam vitae.</span><span>Ab aliquid, amet architecto ducimus eaque error esse eveniet facilis fuga fugiat id in ipsum iste itaque laborum, minus modi necessitatibus neque obcaecati odio perferendis porro quisquam recusandae reiciendis similique?</span><span>A alias consectetur debitis dolores ducimus eius fuga illum laudantium molestias natus neque nobis officia officiis pariatur perferendis praesentium quam, quidem quisquam rem repellat rerum sapiente soluta sunt totam voluptatum!</span><span>Dicta perspiciatis, tempora? Alias at aut autem culpa dicta earum, eos eveniet, expedita fuga in incidunt, ipsa iste magni recusandae reiciendis reprehenderit temporibus. Culpa est eveniet itaque maxime odit quisquam.</span><span>Accusantium animi cupiditate deleniti dolor dolorem dolores eos eum laboriosam maiores maxime modi nisi non officiis ratione sequi, tempora temporibus unde veritatis voluptates voluptatum. Eum molestiae provident quia recusandae saepe.</span><span>Alias aperiam at beatae, culpa delectus deleniti ea ipsum itaque labore maiores neque nisi obcaecati odit optio quae quisquam quos ratione suscipit vitae voluptates. Accusamus deleniti facilis nobis quos vero.</span><span>Consectetur consequatur cum debitis, deserunt doloribus enim, explicabo iste nihil numquam perferendis porro provident repellat rerum, tenetur unde ut veniam! Aliquid deserunt dolor dolorum eos ipsa iure rerum, tenetur totam!</span><span>Amet asperiores corporis doloremque exercitationem itaque praesentium recusandae, soluta sunt tenetur unde. Nam sequi, suscipit. Aliquam cupiditate doloremque doloribus dolorum error id inventore ipsum, perferendis placeat soluta vitae voluptas voluptates?</span>
//                     </p>
//                     <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis impedit optio pariatur soluta totam, unde. Exercitationem ipsa libero maiores necessitatibus nisi quasi quos sequi vero! Assumenda dolores dolorum itaque iusto?</span><span>Alias aliquam aperiam asperiores cum cupiditate dolorum est exercitationem expedita explicabo fugit illum in, inventore libero mollitia nostrum, officia optio perferendis porro quam reiciendis repudiandae voluptatibus voluptatum! Consectetur, nihil quia?</span><span>Blanditiis cumque illum laborum praesentium, quidem quis sit soluta totam! Animi dolore eos et expedita incidunt nobis numquam. Ab consequuntur distinctio impedit laudantium magnam, necessitatibus porro quae repellendus veniam vitae.</span><span>Ab aliquid, amet architecto ducimus eaque error esse eveniet facilis fuga fugiat id in ipsum iste itaque laborum, minus modi necessitatibus neque obcaecati odio perferendis porro quisquam recusandae reiciendis similique?</span><span>A alias consectetur debitis dolores ducimus eius fuga illum laudantium molestias natus neque nobis officia officiis pariatur perferendis praesentium quam, quidem quisquam rem repellat rerum sapiente soluta sunt totam voluptatum!</span><span>Dicta perspiciatis, tempora? Alias at aut autem culpa dicta earum, eos eveniet, expedita fuga in incidunt, ipsa iste magni recusandae reiciendis reprehenderit temporibus. Culpa est eveniet itaque maxime odit quisquam.</span><span>Accusantium animi cupiditate deleniti dolor dolorem dolores eos eum laboriosam maiores maxime modi nisi non officiis ratione sequi, tempora temporibus unde veritatis voluptates voluptatum. Eum molestiae provident quia recusandae saepe.</span><span>Alias aperiam at beatae, culpa delectus deleniti ea ipsum itaque labore maiores neque nisi obcaecati odit optio quae quisquam quos ratione suscipit vitae voluptates. Accusamus deleniti facilis nobis quos vero.</span><span>Consectetur consequatur cum debitis, deserunt doloribus enim, explicabo iste nihil numquam perferendis porro provident repellat rerum, tenetur unde ut veniam! Aliquid deserunt dolor dolorum eos ipsa iure rerum, tenetur totam!</span><span>Amet asperiores corporis doloremque exercitationem itaque praesentium recusandae, soluta sunt tenetur unde. Nam sequi, suscipit. Aliquam cupiditate doloremque doloribus dolorum error id inventore ipsum, perferendis placeat soluta vitae voluptas voluptates?</span>
//                     </p>
//                     <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis impedit optio pariatur soluta totam, unde. Exercitationem ipsa libero maiores necessitatibus nisi quasi quos sequi vero! Assumenda dolores dolorum itaque iusto?</span><span>Alias aliquam aperiam asperiores cum cupiditate dolorum est exercitationem expedita explicabo fugit illum in, inventore libero mollitia nostrum, officia optio perferendis porro quam reiciendis repudiandae voluptatibus voluptatum! Consectetur, nihil quia?</span><span>Blanditiis cumque illum laborum praesentium, quidem quis sit soluta totam! Animi dolore eos et expedita incidunt nobis numquam. Ab consequuntur distinctio impedit laudantium magnam, necessitatibus porro quae repellendus veniam vitae.</span><span>Ab aliquid, amet architecto ducimus eaque error esse eveniet facilis fuga fugiat id in ipsum iste itaque laborum, minus modi necessitatibus neque obcaecati odio perferendis porro quisquam recusandae reiciendis similique?</span><span>A alias consectetur debitis dolores ducimus eius fuga illum laudantium molestias natus neque nobis officia officiis pariatur perferendis praesentium quam, quidem quisquam rem repellat rerum sapiente soluta sunt totam voluptatum!</span><span>Dicta perspiciatis, tempora? Alias at aut autem culpa dicta earum, eos eveniet, expedita fuga in incidunt, ipsa iste magni recusandae reiciendis reprehenderit temporibus. Culpa est eveniet itaque maxime odit quisquam.</span><span>Accusantium animi cupiditate deleniti dolor dolorem dolores eos eum laboriosam maiores maxime modi nisi non officiis ratione sequi, tempora temporibus unde veritatis voluptates voluptatum. Eum molestiae provident quia recusandae saepe.</span><span>Alias aperiam at beatae, culpa delectus deleniti ea ipsum itaque labore maiores neque nisi obcaecati odit optio quae quisquam quos ratione suscipit vitae voluptates. Accusamus deleniti facilis nobis quos vero.</span><span>Consectetur consequatur cum debitis, deserunt doloribus enim, explicabo iste nihil numquam perferendis porro provident repellat rerum, tenetur unde ut veniam! Aliquid deserunt dolor dolorum eos ipsa iure rerum, tenetur totam!</span><span>Amet asperiores corporis doloremque exercitationem itaque praesentium recusandae, soluta sunt tenetur unde. Nam sequi, suscipit. Aliquam cupiditate doloremque doloribus dolorum error id inventore ipsum, perferendis placeat soluta vitae voluptas voluptates?</span>
//                     </p>
//                 </Box>
//             </Container>
//             <ScrollTop {...props}>
//                 <Fab color="secondary" size="small" aria-label="scroll back to top">
//                     <KeyboardArrowUpIcon/>
//                 </Fab>
//             </ScrollTop>
//         </div>
//     );
// }
//
// export {Header};