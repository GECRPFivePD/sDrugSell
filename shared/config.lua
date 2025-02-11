Config = {}

Config.SellComand = 'selldrugs' -- Command to sell drugs
Config.SellKeybind = 'F9' -- Keybind to sell drugs (you can either use the command or the keybind)

Config.ZoneControlCommand = 'zonecontrol' -- Command to control zones
Config.ZoneControlKeybind = 'F10' -- Keybind to control zones (you can either use the command or the keybind)

Config.SellingDistanceBetweenPed = 2.5 -- Distance between the seller and the buyer
Config.MinimumSalesToOwnZone = 2 -- Minimum sales to own a zone
Config.PriceMultiplierInEnemyZone = 1.3
Config.ChanceToAcceptHigherPrice = 30 -- Chance/100 to accept higher 
Config.CoolDownBetweenEachSale = 10 -- In seconds
Config.TimeToStartSellingWithPed = 15 -- In seconds
Config.PoliceCallChance = 20 -- Chance/100 to call the police
Config.MarginTooHigh = 20 -- If the difference between the proposed price and the market price is higher than this value, the seller will refuse the offer directly
Config.ResName = GetCurrentResourceName() -- Resource name

Config.PoliceAlert = function()
    TriggerServerEvent('police:server:policeAlert', 'Drug sale in progress')
end

Config.Target = 'ox'

Config.Drugs = {
    ['weed_baggy'] = {
        name = 'weed',
        label = 'Marijuana',
        minOffer = 1,
        maxOffer = 5,
        minPrice = 30,
        maxPrice = 60
    },
    ['coke_baggy'] = {
        name = 'cokebaggy',
        label = 'Cocaine',
        minOffer = 2,
        maxOffer = 10,
        minPrice = 60,
        maxPrice = 120
    },
    ['meth_baggy'] = {
        name = 'meth',
        label = 'Meth',
        minOffer = 3,
        maxOffer = 15,
        minPrice = 150,
        maxPrice = 180
    },
    ['coke_brick'] = {
        name = 'cokebrick',
        label = 'Cocaine brick',
        minOffer = 1,
        maxOffer = 5,
        minPrice = 30,
        maxPrice = 60
    },
    -- ['opium'] = {
    --     name = 'opium',
    --     label = 'Opium',
    --     minOffer = 1,
    --     maxOffer = 5,
    --     minPrice = 30,
    --     maxPrice = 60
    -- }
}

Config.Phrases = {
    [1] = { -- First stranger approach
        Stranger = {
            'Can I help you with something?',
            'Sorry, do I know you?',
        },
        Seller = {
            Accept = {
                'Hey, are you looking for something?',
                'Hey, do you need something?',
                'Hey, do you wanna go on an a high adventure?'
            },
            Decline = {
                'Nevermind, have a good day.',
                'Sorry, I must have the wrong person.',
            }
        }
    },
    [2] = { -- Stranger asks what do the seller provide, buyer must choose drug that he want to sell
        Stranger = {
            'What do you have for me?',
        },
        Seller = {
            Accept = {
                'I have some: ',
                'I can offer you: ',
                'I have: '
            },
            Decline = {
                'Nevermind, have a good day.',
                'Sorry, I must have the wrong person.',
            }
        }
    },
    [3] = { -- Seller offers something else
        Seller = {
            OfferSomethingElse = {
                'I can offer you something else.',
                'I have something else for you.',
            }
        }
    },
    [4] = { -- Seller accepts the price
        Stranger = {
            'Seems good to me. Hand it over.',
            'Alright, let me see the goods.',
        },
        Seller = {
            Accept = {
                'Alright, here you go.',
                'Here you go.',
            },
            Decline = {
                'I changed my mind.',
            }
        }
    },
    [5] = { -- Stranger declines the price
        Stranger = {
            'Nah, that\'s too much for me.',
            'I can\'t afford that.',
        },
        Seller = {
            'I can\'t go lower than that. Goodbye.',
            'Sorry, I can\'t lower the price.',
        }
    }
}