import React from 'react'
import { styled } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import { StarBorder, Star } from '@material-ui/icons'

const ToggleStarredButton = ({ onClick, starred }) => (
    <IconButtonStyled edge="end" aria-label="Toggle starred" onClick={onClick}>
        {starred ? <Star /> : <StarBorder />}
    </IconButtonStyled>
)

export default ToggleStarredButton

const IconButtonStyled = styled(IconButton)({
    color: '#FF9800',
})
